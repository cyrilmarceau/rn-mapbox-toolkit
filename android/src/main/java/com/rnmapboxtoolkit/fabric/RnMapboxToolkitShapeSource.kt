package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import android.util.Log
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.geojson.Feature
import com.mapbox.geojson.FeatureCollection
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.GeoJsonSource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import org.json.JSONException
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
                map.getMapboxMap()?.style?.let { style ->
                    childLayers.forEach { it.removeFromMap(map, reason) }
                    style.removeStyleSource(sourceID)
                }
            }
        }
        return super.removeFromMap(mapView, reason)
    }

    override fun addChild(child: AbstractMapFeature) {
        Log.d(TAG, "addChild()")
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
                    mapView.getMapboxMap()?.awaitStyle()?.let { style ->
                        when {
                            style.styleSourceExists(sourceID) -> {
                                Log.i(TAG, "Layer '$sourceID' already exists, skipping creation")
                                return@launch
                            }
                        }
                        childLayers.forEach { it.removeFromMap(mapView, RemovalReason.ON_DESTROY) }
                        style.removeStyleSource(sourceID)

                        shape?.let { shapeData ->
                            try {
                                val jsonObject = JSONObject(shapeData)

                                Log.d(TAG, "jsonObject $jsonObject")

                                val type = jsonObject.getString("type")
                                val sourceBuilder = when(type) {
                                    "Feature" -> GeoJsonSource.Builder(sourceID)
                                        .feature(Feature.fromJson(shapeData))
                                    "FeatureCollection" -> GeoJsonSource.Builder(sourceID)
                                        .featureCollection(FeatureCollection.fromJson(shapeData))
                                    else -> return@let
                                }

                                style.addSource(sourceBuilder
                                    .cluster(cluster)
                                    .buffer(buffer)
                                    .tolerance(tolerance)
                                    .clusterRadius(clusterRadius)
                                    .clusterMaxZoom(clusterMaxZoom)
                                    .clusterMinPoints(clusterMinPoints)
                                    .build()
                                )
                            } catch (e: JSONException) {
                                Log.e(TAG, "Invalid JSON format", e)
                            }
                        }

                        childLayers.forEach { it.addToMap(mapView) }
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to add source to map", e)
                }
            }
        }
    }

    fun setShape(value: String?) {
        if(shape != value) {
            shape = value
            updateSourceAndLayers()
        }

    }

    fun setSourceID(value: String?) {
        value?.let {
            if(sourceID != it) {
                sourceID = it
                updateSourceAndLayers()
            }
        }

    }

    fun setClusterMinPoints(value: Double) {
        if(clusterMinPoints != value.toLong()) {
            clusterMinPoints = value.toLong()
        }
    }

    fun setClusterMaxZoom(value: Double) {
        if(clusterMaxZoom != value.toLong()) {
            clusterMaxZoom = value.toLong()
        }
    }

    fun setClusterRadius(value: Double) {
        if(clusterRadius != value.toLong()) {
            clusterRadius = value.toLong()
        }
    }
    fun setCluster(value: Boolean) {
        if(cluster != value) {
            cluster = value
        }
    }
    fun setTolerance(value: Double) {
        if(tolerance != value) {
            tolerance = value
        }
    }
    fun setBuffer(value: Double) {
        if(buffer != value.toLong()) {
            buffer = value.toLong()
        }
    }
}


