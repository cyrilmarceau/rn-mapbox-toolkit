package com.rnmapboxtoolkit.extensions


import android.util.Log
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.JsonObject
import com.mapbox.geojson.Feature
import com.mapbox.geojson.FeatureCollection
import com.mapbox.geojson.Geometry
import com.mapbox.geojson.Point

/**
 * Parse a [FeatureCollection] to a [WritableMap]
 */
fun FeatureCollection.toReadableMap(): WritableNativeMap {
    Log.d("Extension", this.toJson())
    return WritableNativeMap().apply {
        putString("type", this@toReadableMap.type())
        putArray("features", this@toReadableMap.features()?.toReadableArray())
    }
}

/**
 * Parse a [Feature] to a [WritableMap]
 */
fun Feature.toReadableMap(): WritableNativeMap {
    return WritableNativeMap().apply {
        putString("type", this@toReadableMap.type())
        putString("id", this@toReadableMap.id())
        putMap("geometry", this@toReadableMap.geometry()?.toReadableMap())
        putMap("properties", this@toReadableMap.properties()?.toReadableMap())
    }
}

/**
 * Parse a [Geometry] to a [WritableMap]
 */
fun Geometry.toReadableMap(): WritableMap {
    return WritableNativeMap().apply {
        putString("type", this@toReadableMap.type())
        when (this@toReadableMap) {
            is Point -> {
                putArray("coordinates", this@toReadableMap.toReadableArray())
            }
        }
    }
}

/**
 * Parse a [FeatureCollection] to a [WritableNativeArray]
 */
fun List<Feature>.toReadableArray(): WritableNativeArray {
    return WritableNativeArray().apply {
        this@toReadableArray.forEach { feature ->
            pushMap(feature.toReadableMap())
        }
    }
}

fun Point.toReadableArray(): WritableNativeArray {
    return WritableNativeArray().apply {
        pushDouble(this@toReadableArray.latitude())
        pushDouble(this@toReadableArray.longitude())
    }
}

fun JsonObject.toReadableMap(): WritableMap {
    val map = WritableNativeMap()

    for (key in this.keySet()) {
        val value = this.get(key)

        if (value.isJsonPrimitive) {
            val valueToPrimitive = value.asJsonPrimitive

            when {
                valueToPrimitive.isBoolean -> map.putBoolean(key, valueToPrimitive.asBoolean)
                valueToPrimitive.isString -> map.putString(key, valueToPrimitive.asString)
                valueToPrimitive.isNumber -> map.putDouble(key, valueToPrimitive.asDouble)
                else -> map.putString(key, valueToPrimitive.toString())
            }
        }
    }

    return map
}
