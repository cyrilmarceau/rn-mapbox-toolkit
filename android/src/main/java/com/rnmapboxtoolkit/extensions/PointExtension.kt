package com.rnmapboxtoolkit.extensions

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.mapbox.geojson.Point

fun Point.toReadableMap() : WritableNativeMap {
    return WritableNativeMap().apply {
        putDouble("longitude", this@toReadableMap.longitude())
        putDouble("latitude", this@toReadableMap.latitude())
    }
}
