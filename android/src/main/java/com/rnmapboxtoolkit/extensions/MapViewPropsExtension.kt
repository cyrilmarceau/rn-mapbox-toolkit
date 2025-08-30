import com.facebook.react.bridge.ReadableMap
import com.mapbox.maps.plugin.scalebar.generated.ScaleBarSettings
import com.mapbox.maps.Style

/**
 * Extension function to convert ReadableMap to Mapbox ScaleBarSettings
 */
fun ReadableMap?.toScaleBarSettingsBlock(): (ScaleBarSettings.Builder.() -> Unit)? {
    return this?.let { map ->
        {
            if (map.hasKey("marginLeft")) {
                marginLeft = map.getDouble("marginLeft").toFloat()
            }
            if (map.hasKey("marginTop")) {
                marginTop = map.getDouble("marginTop").toFloat()
            }
            if (map.hasKey("marginRight")) {
                marginRight = map.getDouble("marginRight").toFloat()
            }
            if (map.hasKey("marginBottom")) {
                marginBottom = map.getDouble("marginBottom").toFloat()
            }


            if (map.hasKey("textColor")) {
                textColor = android.graphics.Color.parseColor(map.getString("textColor"))
            }
            if (map.hasKey("primaryColor")) {
                primaryColor = android.graphics.Color.parseColor(map.getString("primaryColor"))
            }
            if (map.hasKey("secondaryColor")) {
                secondaryColor = android.graphics.Color.parseColor(map.getString("secondaryColor"))
            }


            if (map.hasKey("borderWidth")) {
                borderWidth = map.getDouble("borderWidth").toFloat()
            }
            if (map.hasKey("textSize")) {
                textSize = map.getDouble("textSize").toFloat()
            }
            if (map.hasKey("refreshInterval")) {
                refreshInterval = map.getDouble("refreshInterval").toLong()
            }
            if (map.hasKey("ratio")) {
                ratio = map.getDouble("ratio").toFloat()
            }
            if (map.hasKey("isMetricUnits")) {
                isMetricUnits = map.getBoolean("isMetricUnits")
            }
        }
    }
}

/**
 * Extension function to convert ReadableMap to Mapbox ScaleBarSettings
 */
fun String.toMapStyleUrl(): String {
    return when (this) {
        "standard" -> Style.MAPBOX_STREETS
        "standard-satellite" -> Style.STANDARD_SATELLITE
        "streets-v12" -> Style.MAPBOX_STREETS
        "outdoors-v12" -> Style.OUTDOORS
        "light-v11" -> Style.LIGHT
        "dark-v11" -> Style.DARK
        "satellite-v9" -> Style.SATELLITE
        "satellite-streets-v12" -> Style.SATELLITE_STREETS
        "traffic-day-v2" -> Style.TRAFFIC_DAY
        "traffic-night-v2" -> Style.TRAFFIC_NIGHT
        else -> Style.MAPBOX_STREETS
    }
}
