package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import android.graphics.Color
import android.util.Log
import androidx.core.view.get
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.bindgen.Value
import com.mapbox.geojson.FeatureCollection
import com.mapbox.maps.MapboxStyleManager
import com.mapbox.maps.coroutine.awaitLoadStyle
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.layers.addLayer
import com.mapbox.maps.extension.style.layers.generated.CircleLayer
import com.mapbox.maps.extension.style.layers.generated.LineLayer
import com.mapbox.maps.extension.style.layers.getLayer
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.GeoJsonSource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch


@SuppressLint("ViewConstructor")
class RnMapboxToolkitCircleLayer(context: ThemedReactContext) : AbstractMapFeature(context) {

    companion object {
        const val TAG = "CircleLayer"
    }

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)


    private var sourceID: String? = null
    private var layerID: String? = null

    /* RN can call setLayerStyle before layer is add to tree
    */
    private var pendingStyle: String? = null


    override fun addToMap(mapView: RnMapboxToolkitView) {
        Log.d(TAG, "addToMap")
        super.addToMap(mapView)
        withMapView { map ->
            scope.launch {
                try {
                    addLayerToMap(map)
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to add layer to map", e)
                }
            }
        }
    }

    private suspend fun addLayerToMap(map: RnMapboxToolkitView) {
        val mapboxMap = map.getMapboxMap()
        if (mapboxMap == null) {
            Log.e(TAG, "MapboxMap is null >>> cannot add layer")
            return
        }

        val style = mapboxMap.awaitStyle()
        val currentLayerID = layerID
        val currentSourceID = sourceID

        // Send warning to RN ? Event to MapView or parent shape ?
        // Or keep log in package and check with adb ?
        // Type already exist from bridge. Use case ??
        when {
            currentLayerID == null -> {
                Log.e(TAG, "LayerID is null, cannot create layer")
                return
            }
            currentSourceID == null -> {
                Log.e(TAG, "SourceID is null, cannot create layer")
                return
            }
            style.styleLayerExists(currentLayerID) -> {
                Log.i(TAG, "Layer '$currentLayerID' already exists, skipping creation")
                return
            }
        }

        val layer = CircleLayer(currentLayerID, currentSourceID).apply {
        }

        style.addLayer(layer)

        // If style is call before layer is add to map, apply style to layer
        pendingStyle?.let { styleJson ->
            applyStyleToLayer(style, currentLayerID, styleJson)
        }
    }

    fun setSourceID(value: String?) {
        this.sourceID = value
    }

    fun setLayerID(value: String?) {
        value?.let { it -> this.layerID = it }
    }

    fun setMaxZoom(value: Double) {

    }
    fun setMinZoom(value: Double) {}

    fun setLayerStyle(value: String?) {
        pendingStyle = value

        withMapView { map ->
            scope.launch {
                try {
                    applyStyleIfLayerExists(map, value)
                } catch (e: Exception) {
                    Log.e(TAG, "Exception while setting layer style", e)
                }
            }
        }
    }

    private suspend fun applyStyleIfLayerExists(map: RnMapboxToolkitView, styleJson: String?) {
        val mapboxMap = map.getMapboxMap()
        if (mapboxMap == null) {
            Log.w(TAG, "MapboxMap is null, cannot apply style")
            return
        }

        val style = mapboxMap.awaitStyle()
        val currentLayerID = layerID

        when {
            styleJson == null -> {
                Log.w(TAG, "Style JSON is null, ignoring")
                return
            }
            currentLayerID == null -> {
                Log.w(TAG, "LayerID is null, cannot apply style")
                return
            }
            !style.styleLayerExists(currentLayerID) -> {
                Log.i(TAG, "" +
                    "Layer '$currentLayerID' doesn't exist yet >>> " +
                    "style will be applied when layer is added")
                return
            }
        }

        applyStyleToLayer(style, currentLayerID, styleJson)
    }

    private fun applyStyleToLayer(style: MapboxStyleManager, layerId: String, styleJson: String) {
        Log.d(TAG, "Applying style to layer '$layerId'")

        val properties = Value.fromJson(styleJson)
        if (!properties.isValue) {
            Log.e(TAG, "JSON parse error for layer '$layerId': ${properties.error}")
            return
        }

        val result = style.setStyleLayerProperties(layerId, properties.value!!)
        if (result.isValue) {
            Log.i(TAG, " Style successfully applied to layer '$layerId'")
        } else {
            Log.e(TAG, "Error applying style to layer '$layerId': ${result.error}")
        }
    }




}


