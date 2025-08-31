import androidx.core.graphics.toColorInt
import com.facebook.react.bridge.ReadableMap
import com.mapbox.maps.plugin.scalebar.generated.ScaleBarSettings
import com.mapbox.maps.Style
import com.mapbox.maps.plugin.attribution.generated.AttributionSettings
import com.mapbox.maps.plugin.logo.generated.LogoSettings

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

fun ReadableMap?.toAttributionSettingsBlock(): (AttributionSettings.Builder.() -> Unit)? {
    return this?.let { map ->
        {
            if (map.hasKey("clickable")) {
                clickable = map.getBoolean("clickable")
            }
            if (map.hasKey("enabled")) {
                enabled = map.getBoolean("enabled")
            }
            if (map.hasKey("iconColor")) {
                iconColor = map.getString("iconColor")?.toColorInt() ?: "#FF1E8CAB".toColorInt()
            }
            if (map.hasKey("marginBottom")) {
                marginBottom = map.getDouble("marginBottom").toFloat()
            }

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
        }
    }
}


fun ReadableMap?.toLogoSettingsBlock(): (LogoSettings.Builder.() -> Unit)? {
    return this?.let { map ->
        {

            if (map.hasKey("enabled")) {
                enabled = map.getBoolean("enabled")
            }
            if (map.hasKey("marginBottom")) {
                marginBottom = map.getDouble("marginBottom").toFloat()
            }
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
        }
    }
}
