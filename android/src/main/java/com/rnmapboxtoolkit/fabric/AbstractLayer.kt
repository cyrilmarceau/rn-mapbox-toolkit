package com.rnmapboxtoolkit.fabric

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Dynamic
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.mapbox.bindgen.Value
import com.mapbox.maps.MapboxStyleManager
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.layers.Layer
import com.mapbox.maps.extension.style.layers.addLayer
import com.mapbox.maps.extension.style.layers.getLayer
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

abstract class AbstractLayer<T : Layer>(context: ThemedReactContext): AbstractMapFeature(context) {
    companion object {
        const val TAG = "AbstractLayer"
    }

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)

    private var sourceID: String? = null
    private var layerID: String? = null
    private var maxZoom: Double? = null
    private var minZoom: Double? = null

    // RN can call setLayerStyle before layer is add to tree
    // Keep in in cache and when layer is add apply to layer
    private var pendingProps: MutableMap<String, Any> = mutableMapOf()

    // Create appropriate layer with given layerId and sourceId and generic Layer
    protected abstract fun createLayer(layerId: String, sourceId: String): T

    override fun addToMap(mapView: RnMapboxToolkitView) {
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

    fun setSourceID(value: String?) {
        sourceID = value
    }

    fun setLayerID(value: String?) {
        layerID = value
    }

    fun setMaxZoom(value: Double?) {
        maxZoom = value
    }

    fun setMinZoom(value: Double?) {
        minZoom = value
    }


    private fun dynamicToList(array: ReadableArray): List<Any> {
        val list = mutableListOf<Any>()
        for (i in 0 until array.size()) {
            when (array.getType(i)) {
                ReadableType.String -> array.getString(i)?.let { st -> list.add(st) }
                ReadableType.Number -> array.getDouble(i).let { db -> list.add(db) }
                ReadableType.Boolean -> array.getBoolean(i).let { bl -> list.add(bl) }
                ReadableType.Array -> array.getArray(i)?.let { ar -> list.add(dynamicToList(ar)) }
                else -> array.getString(i)?.let { et -> list.add(et) }
            }
        }
        return list
    }

    private fun listToJSONArray(list: List<*>): JSONArray {
        val array = JSONArray()
        for (item in list) {
            when (item) {
                is String, is Number, is Boolean -> array.put(item)
                is List<*> -> array.put(listToJSONArray(item))
                is Map<*, *> -> array.put(mapToJSONObject(item))
                else -> array.put(item.toString())
            }
        }
        return array
    }

    private fun mapToJSONObject(map: Map<*, *>): JSONObject {
        val json = JSONObject()
        for ((key, value) in map) {
            when (value) {
                is List<*> -> json.put(key.toString(), listToJSONArray(value))
                is Map<*, *> -> json.put(key.toString(), mapToJSONObject(value))
                else -> json.put(key.toString(), value)
            }
        }
        return json
    }

    fun setLayerStyle(value: String?) {
        Log.d(TAG, "Called")
        value?.let { styleStr ->
            try {
                val json = JSONObject(styleStr)
                json.keys().forEach { key ->
                    pendingProps[key] = json.get(key)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Invalid layerStyle JSON", e)
            }
        }
        Log.d(TAG, "pendingProps $pendingProps")
    }

    fun setFilter(value: Dynamic?) {
        value?.let { filter ->
            try {
                val array = filter.asArray()
                array?.let { it ->
                    pendingProps["filter"] = dynamicToList(it)
                    Log.d(TAG, "setFilter() converted filter list: ${pendingProps["filter"]}")
                }

            } catch (e: Exception) {
                Log.e(TAG, "Invalid layerStyle JSON", e)
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

        val layer = createLayer(currentLayerID, currentSourceID)

        style.addLayer(layer)

        // If style is call before layer is add to map, apply style to layer
        if (pendingProps.isNotEmpty()) {
            val mergedJson = JSONObject()
            for ((key, value) in pendingProps) {
                if (value is List<*>) {
                    mergedJson.put(key, JSONArray(value))
                } else {
                    mergedJson.put(key, value)
                }
            }
            Log.d(TAG, "Merged JSON: $mergedJson")
            applyPropsToLayer(style, currentLayerID, mergedJson.toString())
        }
    }

    private fun applyPropsToLayer(style: MapboxStyleManager, layerId: String, styleJson: String) {
        Log.d(TAG, "Applying style to layer '$layerId'")
        Log.d(TAG, "Applying style to layer with json '$styleJson'")

        val properties = Value.fromJson(styleJson)
        Log.d(TAG, "JSON parse result: ${properties.value}")
        if (!properties.isValue) {
            Log.e(TAG, "JSON parse error for layer '$layerId': ${properties.error}")
            return
        }

        style.getLayer(layerId).let { layer ->
            minZoom?.let { layer?.minZoom(it) }
            maxZoom?.let { layer?.maxZoom(it) }
        }

        val result = style.setStyleLayerProperties(layerId, properties.value!!)

        if (result.isValue) {
            Log.i(TAG, " Style successfully applied to layer '$layerId'")
        } else {
            Log.e(
                "AbstractLayer",
                "Error applying style to layer '$layerId': ${result.error}"
            )
            result.error?.let { it -> dispatchStyleError(it)}

        }
    }

    private fun dispatchStyleError(errorMessage: String) {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)

        val payload = Arguments.createMap().apply {
            putString("message", errorMessage)
        }
        val properties = Arguments.createMap().apply {
            putMap("properties", payload)
        }
        val event = OnLayerStyleErrorEvent(surfaceId, id, properties)
        eventDispatcher?.dispatchEvent(event)
    }

}
