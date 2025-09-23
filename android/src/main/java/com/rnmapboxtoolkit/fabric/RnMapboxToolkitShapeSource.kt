package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.mapbox.geojson.Feature
import com.mapbox.geojson.FeatureCollection
import com.mapbox.geojson.Point
import com.mapbox.maps.MapboxMap
import com.mapbox.maps.QueriedRenderedFeature
import com.mapbox.maps.RenderedQueryGeometry
import com.mapbox.maps.RenderedQueryOptions
import com.mapbox.maps.ScreenBox
import com.mapbox.maps.ScreenCoordinate
import com.mapbox.maps.Style
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.GeoJsonSource
import com.rnmapboxtoolkit.extensions.toReadableMap
import com.rnmaps.fabric.event.OnShapePressEvent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import org.json.JSONObject


@SuppressLint("ViewConstructor")
class RnMapboxToolkitShapeSource(context: ThemedReactContext) : AbstractMapFeature(context) {
    companion object {
        const val TAG = "ShapeSource"
    }

    private var sourceID: String = "default-source-id"
    private var shape: String? = null
    private var cluster: Boolean = false
    private var clusterRadius: Long = 50
    private var clusterMaxZoom: Long = 14
    private var clusterMinPoints: Long = 2
    private var tolerance: Double = 0.375
    private var buffer: Long = 128
    private var hitSlop: HitSlop? = null

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)

    private val childLayers = mutableListOf<AbstractMapFeature>()

    override fun addToMap(mapView: RnMapboxToolkitView) {
        Log.d(TAG, "addToMap()")
        super.addToMap(mapView)
        updateSourceAndLayers()
    }

    override fun removeFromMap(mapView: RnMapboxToolkitView, reason: RemovalReason): Boolean {
        Log.d(TAG, "removeFromMap")
        withMapView { map ->
            scope.launch {
                removeSourceFromMap(map, reason)
            }
        }
        return super.removeFromMap(mapView, reason)
    }


    private fun removeSourceFromMap(map: RnMapboxToolkitView, reason: RemovalReason) {
        map.getMapboxMap()?.style?.let { style ->
            removeChildLayers(map, reason)
            removeSourceFromStyle(style)
        }
    }

    private fun removeChildLayers(map: RnMapboxToolkitView, reason: RemovalReason) {
        childLayers.forEach { it.removeFromMap(map, reason) }
    }

    private fun removeSourceFromStyle(style: Style) {
        style.removeStyleSource(sourceID)
    }

    override fun addChild(child: AbstractMapFeature) {
        childLayers.add(child)

        updateSourceAndLayers()
    }

    override fun removeChild(child: AbstractMapFeature) {
        childLayers.remove(child)

        updateSourceAndLayers()
    }

    override fun onMapClick(point: Point): Boolean {
        withMapView { mapView -> handleMapClick(mapView, point) }

        return true
    }

    private fun handleMapClick(mapView: RnMapboxToolkitView, point: Point) {
        mapView.getMapboxMap()?.let { mapboxMap ->
            val pixel = convertPointToPixel(mapboxMap, point)
            queryFeaturesAtPixel(mapView, pixel)
        }

    }

    private fun convertPointToPixel(map: MapboxMap, point: Point): ScreenBox {
        val pixel = map.pixelForCoordinate(point)

        val currentHitSlop = hitSlop

        if (currentHitSlop == null) {
            return ScreenBox(pixel, pixel)
        }

        val halfWidth = currentHitSlop.width / 2
        val halfHeight = currentHitSlop.height / 2

        pixel.let { it ->
            val topLeft = ScreenCoordinate(
                pixel.x - halfWidth,
                pixel.y - halfHeight
            )
            val bottomRight = ScreenCoordinate(
                pixel.x + halfWidth,
                pixel.y + halfHeight
            )

            Log.d(TAG, "topLeft: $topLeft")
            Log.d(TAG, "bottomRight: $bottomRight")

            val screenCoordinate = ScreenBox(topLeft, bottomRight)

            return screenCoordinate
        }
    }

    /**
     * Query rendered features at the given pixel with additional hitSlop.
     */
    private fun queryFeaturesAtPixel(mapView: RnMapboxToolkitView, pixel: ScreenBox) {
        val map = mapView.getMapboxMap()

        map?.queryRenderedFeatures(
            RenderedQueryGeometry(pixel),
            RenderedQueryOptions(getSourceLayerIDS(), null)
        ) { features ->
            if (features.isValue) {
                handleQuerySuccess(features.value)
            } else {
                Log.d(TAG, "features error ${features.error}")
            }
        }
    }

    private fun handleQuerySuccess(features: List<QueriedRenderedFeature>?) {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher =
            UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)

        val fts = Arguments.createArray()

        features?.let { features ->
            if (features.isNotEmpty()) {
                features.forEach { features ->
                    fts.pushMap(features.queriedFeature.feature.toReadableMap())
                }
            }
        }

        val payload = Arguments.createMap().apply { putArray("features", fts) }

        val event = OnShapePressEvent(surfaceId, id, payload)
        eventDispatcher?.dispatchEvent(event)
    }

    private fun updateSourceAndLayers() {
        withMapView { mapView ->
            scope.launch {
                try {
                    updateMapSource(mapView)
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to add source to map", e)
                }
            }
        }
    }

    private suspend fun updateMapSource(mapView: RnMapboxToolkitView) {
        val style = getMapStyle(mapView) ?: return

        if (hasSourceExisting(style)) {
            Log.i(TAG, "Layer '$sourceID' already exists, skipping creation")
            return
        }

        removeExisting(mapView, style)
        createSource(style)
        addChildLayers(mapView)
    }

    private suspend fun getMapStyle(mapView: RnMapboxToolkitView): Style? {
        return mapView.getMapboxMap()?.awaitStyle()
    }

    private fun hasSourceExisting(style: Style): Boolean {
        return style.styleSourceExists(sourceID)
    }

    private fun removeExisting(mapView: RnMapboxToolkitView, style: Style) {
        removeChildLayers(mapView, RemovalReason.ON_DESTROY)
        removeSourceFromStyle(style)
    }

    private fun createSource(style: Style) {
        shape?.let { shapeData ->
            val sourceBuilder = createGeoJsonBuilder(shapeData)
            sourceBuilder?.let { it ->
                val source = buildSource(it, style)
                addSourceToStyle(style, source)
            }
        }
    }

    private fun createGeoJsonBuilder(shapeData: String): GeoJsonSource.Builder? {
        val jsonObject = JSONObject(shapeData)

        val type = jsonObject.getString("type")
        val sourceBuilder = when (type) {
            "Feature" -> GeoJsonSource.Builder(sourceID)
                .feature(Feature.fromJson(shapeData))

            "FeatureCollection" -> GeoJsonSource.Builder(sourceID)
                .featureCollection(FeatureCollection.fromJson(shapeData))

            else -> return null
        }

        return sourceBuilder
    }

    private fun buildSource(sourceBuilder: GeoJsonSource.Builder, style: Style): GeoJsonSource {
        return sourceBuilder
            .cluster(cluster)
            .buffer(buffer)
            .tolerance(tolerance)
            .clusterRadius(clusterRadius)
            .clusterMaxZoom(clusterMaxZoom)
            .clusterMinPoints(clusterMinPoints)
            .build()
    }

    private fun addSourceToStyle(style: Style, source: GeoJsonSource) {
        style.addSource(source)
    }

    private fun addChildLayers(mapView: RnMapboxToolkitView) {
        childLayers.forEach { it.addToMap(mapView) }
    }

    fun setShape(value: String?) {
        if (shape != value) {
            shape = value
            updateSourceAndLayers()
        }

    }

    fun setSourceID(value: String?) {
        value?.let {
            if (sourceID != it) {
                sourceID = it
                updateSourceAndLayers()
            }
        }

    }

    fun setClusterMinPoints(value: Double) {
        if (clusterMinPoints != value.toLong()) {
            clusterMinPoints = value.toLong()
        }
    }

    fun setClusterMaxZoom(value: Double) {
        if (clusterMaxZoom != value.toLong()) {
            clusterMaxZoom = value.toLong()
        }
    }

    fun setClusterRadius(value: Double) {
        if (clusterRadius != value.toLong()) {
            clusterRadius = value.toLong()
        }
    }

    fun setCluster(value: Boolean) {
        if (cluster != value) {
            cluster = value
        }
    }

    fun setTolerance(value: Double) {
        if (tolerance != value) {
            tolerance = value
        }
    }

    fun setBuffer(value: Double) {
        if (buffer != value.toLong()) {
            buffer = value.toLong()
        }
    }

    fun setHitSlopArea(value: ReadableMap?) {
        value?.let {
            val width = it.getDouble("width")
            val height = it.getDouble("height")
            hitSlop = HitSlop(width, height)
        }
    }

    data class HitSlop(val width: Double, val height: Double)
}
