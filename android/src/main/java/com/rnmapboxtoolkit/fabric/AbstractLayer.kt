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
import com.mapbox.maps.Style
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

abstract class AbstractLayer<T : Layer>(context: ThemedReactContext) : AbstractMapFeature(context) {
    companion object {
        const val TAG = "AbstractLayer"
    }

    data class LayerData(val sourceId: String?, val layerId: String)

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)

    private var sourceID: String? = null
    private var layerID: String? = null
    private var maxZoom: Double? = null
    private var minZoom: Double? = null


    // RN can call setLayerStyle before layer is add to tree. Keep in in cache and when layer is add apply to layer
    private var pendingProps: MutableMap<String, Any> = mutableMapOf()

    // Create appropriate layer with given layerId and sourceId and generic Layer

    protected abstract fun createLayer(layerId: String, sourceId: String?): T

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

    fun setLayerStyle(value: String?) {
        value?.let { styleStr -> parseAndStoreStyle(styleStr) }
    }

    fun setFilter(value: Dynamic?) {
        value?.let { filter -> parseAndStoreFilter(filter) }
    }

    private fun parseAndStoreStyle(styleStr: String) {
        try {
            val json = JSONObject(styleStr)
            json.keys().forEach { key ->
                pendingProps[key] = json.get(key)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Invalid layerStyle JSON", e)
        }
    }

    private fun parseAndStoreFilter(filter: Dynamic) {
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


    private suspend fun addLayerToMap(mapView: RnMapboxToolkitView) {

        mapView.getMapboxMap() ?: return
        val style = getMapStyle(mapView) ?: return
        val layerData = getValidLayerData() ?: return

        if (hasLayerExisting(style, layerData.layerId)) {
            Log.i(TAG, "Layer '${layerData.layerId}' already exists, skipping creation")
            return
        }

        val layer = createNewLayer(layerData)

        Log.d(TAG, "creating layer ${layer.layerId}")
        // for detect MapClick (Cluster ...) we need to now which layer exist for RenderedQueryOptions
        addLayerToSource(layerData.layerId)

        addLayerToStyle(style, layer)

        applyPendingPropsIfAny(style, layerData.layerId)
    }

    private fun createNewLayer(layerData: LayerData): Layer {
        return createLayer(layerData.layerId, layerData.sourceId)
    }

    private fun addLayerToStyle(style: Style, layer: Layer) {
        style.addLayer(layer)
    }

    private fun applyPendingPropsIfAny(style: Style, layerId: String) {
        if (pendingProps.isEmpty()) return
        val styleJSON: String = createStyleJSONFromPendingProps()

        applyStyleToLayer(style, layerId, styleJSON)
    }

    /**
     * Merge style and filter props into a single JSON object
     */
    private fun createStyleJSONFromPendingProps(): String {
        val mergedJson = JSONObject()
        for ((key, value) in pendingProps) {
            if (value is List<*>) {
                mergedJson.put(key, JSONArray(value))
            } else {
                mergedJson.put(key, value)
            }
        }

        return mergedJson.toString()
    }


    private fun applyStyleToLayer(style: MapboxStyleManager, layerId: String, styleJson: String) {
        Log.d(TAG, "Applying style to layer $layerId with json '$styleJson'")

        val properties = parseStyleJSON(styleJson)

        properties?.let { properties ->
            applyZoomLevelsToLayer(style, layerId)
            applyStyleProperties(style, layerId, properties)
        }
    }

    private fun parseStyleJSON(styleJson: String): Value? {
        val properties = Value.fromJson(styleJson)
        Log.d(TAG, "JSON parse result: ${properties.value}")
        if (!properties.isValue) {
            return null
        }

        return properties.value
    }


    private fun applyZoomLevelsToLayer(style: MapboxStyleManager, layerId: String) {
        style.getLayer(layerId)?.let { layer ->
            minZoom?.let { layer.minZoom(it) }
            maxZoom?.let { layer.maxZoom(it) }
        }
    }


    private fun applyStyleProperties(
        style: MapboxStyleManager, layerId: String, properties: Value
    ) {
        val result = style.setStyleLayerProperties(layerId, properties)

        if (result.isValue) {
            Log.i(TAG, "Style successfully applied to layer '$layerId'")
        } else {
            dispatchStyleError(result.error.toString())
        }
    }


    private suspend fun getMapStyle(mapView: RnMapboxToolkitView): Style? {
        return mapView.getMapboxMap()?.awaitStyle()
    }

    private fun getValidLayerData(): LayerData? {
        val currentLayerID = layerID
        val currentSourceID = sourceID

        return when {
            currentLayerID == null -> {
                Log.e(TAG, "LayerID is null, cannot create layer")
                return null
            }

            else -> {
                LayerData(currentSourceID, currentLayerID)
            }
        }
    }

    private fun hasLayerExisting(style: Style, lID: String): Boolean {
        return style.styleLayerExists(lID)
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

}
