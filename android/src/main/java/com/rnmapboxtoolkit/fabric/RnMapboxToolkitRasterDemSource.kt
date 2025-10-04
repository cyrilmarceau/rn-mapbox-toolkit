package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import android.util.Log
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.Style
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.RasterDemSource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch


@SuppressLint("ViewConstructor")
class RnMapboxToolkitRasterDemSource(context: ThemedReactContext) : AbstractMapFeature(context) {
    companion object {
        const val TAG = "RasterDemSource"
    }

    private var sourceID: String = "default-source-id"
    private var rasterUrl: String? = null
    private var tileSize: Long = 512
    private var maxZoom: Long = 22
    private var minZoom: Long = 0
    private var minimumTileUpdateInterval: Double = 0.0
    private var prefetchZoomDelta: Long = 4


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
        val sourceBuilder = rasterUrl?.let { url ->
            createUrlGeoJsonBuilder(url)
        }

        sourceBuilder?.let { builder ->
            val source = buildSource(builder, style)
            addSourceToStyle(style, source)
        }
    }

    private fun createUrlGeoJsonBuilder(geoJsonUrl: String): RasterDemSource.Builder? {
        return RasterDemSource.Builder(sourceID).url(geoJsonUrl)
    }

    private fun buildSource(sourceBuilder: RasterDemSource.Builder, style: Style): RasterDemSource {
        return sourceBuilder
            .tileSize(tileSize)
            .maxzoom(maxZoom)
            .minimumTileUpdateInterval(minimumTileUpdateInterval)
            .minzoom(minZoom)
            .prefetchZoomDelta(prefetchZoomDelta)
            .build()
    }

    private fun addSourceToStyle(style: Style, source: RasterDemSource) {
        style.addSource(source)
    }

    private fun addChildLayers(mapView: RnMapboxToolkitView) {
        childLayers.forEach { it.addToMap(mapView) }
    }

    fun setSourceID(value: String?) {
        value?.let {
            if (sourceID != it) {
                sourceID = it
                updateSourceAndLayers()
            }
        }

    }

    fun setUrl(value: String?) {
        if (rasterUrl != value) {
            rasterUrl = value
        }
    }

    fun setMaxZoom(value: Double) {
       if (maxZoom != value.toLong()) {
           maxZoom = value.toLong()
       }
    }

    fun setMinZoom(value: Double) {
       if (minZoom != value.toLong()) {
           minZoom = value.toLong()
       }
    }

    fun setTileSize(value: Double) {
       if (tileSize != value.toLong()) {
           tileSize = value.toLong()
       }
    }
}
