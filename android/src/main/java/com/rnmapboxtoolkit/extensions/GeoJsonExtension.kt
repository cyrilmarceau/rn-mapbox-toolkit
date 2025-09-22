package com.rnmapboxtoolkit.extensions


import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.JsonObject
import com.mapbox.geojson.Feature
import com.mapbox.geojson.Geometry
import com.mapbox.geojson.Point

fun Feature.toReadableMap() : WritableNativeMap {
    return WritableNativeMap().apply {
        putString("type", this@toReadableMap.type())
        putString("id", this@toReadableMap.id())
        putMap("geometry", this@toReadableMap.geometry()?.toReadableMap())
        putMap("properties", this@toReadableMap.properties()?.toReadableMap())
    }
}

fun Geometry.toReadableMap(): WritableMap {
    return WritableNativeMap().apply {
        putString("type", this@toReadableMap.type())
        when (this@toReadableMap) {
            is Point -> {
                putMap("coordinates", this@toReadableMap.toReadableMap())
            }
        }
    }
}

fun Point.toReadableMap() : WritableNativeMap {
    return WritableNativeMap().apply {
        putDouble("longitude", this@toReadableMap.longitude())
        putDouble("latitude", this@toReadableMap.latitude())
    }
}

fun JsonObject.toReadableMap(): WritableMap {
    val map = WritableNativeMap()

    for (key in this.keySet()) {
        val value = this.get(key)

        if(value.isJsonPrimitive) {
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
