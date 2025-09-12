package com.rnmapboxtoolkit.extensions

import com.mapbox.geojson.Point
import com.mapbox.maps.CameraOptions
import com.mapbox.maps.plugin.animation.MapAnimationOptions
import org.json.JSONObject

fun JSONObject.toCameraOptions(): CameraOptions {
    val builder = CameraOptions.Builder()

    if (has("center")) {
        val centerObj = getJSONObject("center")
        val lng = centerObj.optDouble("longitude", 0.0)
        val lat = centerObj.optDouble("latitude", 0.0)
        builder.center(Point.fromLngLat(lng, lat))
    }

    if (has("zoom")) builder.zoom(optDouble("zoom", 0.0))
    if (has("bearing")) builder.bearing(optDouble("bearing", 0.0))
    if (has("pitch")) builder.pitch(optDouble("pitch", 0.0))

    return builder.build()
}

fun JSONObject.toAnimationOptions(): MapAnimationOptions {
    val builder = MapAnimationOptions.Builder()

    if (has("duration")) builder.duration(optLong("duration"))
    if (has("startDelay")) builder.startDelay(optLong("startDelay"))

    return builder.build()
}
