package com.rnmapboxtoolkit.mapper

import com.mapbox.maps.Style

enum class MapStyleURL(val value: String) {
    STANDARD("standard"),
    STANDARD_SATELLITE("standard-satellite"),
    STREETS_V12("streets-v12"),
    OUTDOORS_V12("outdoors-v12"),
    LIGHT_V11("light-v11"),
    DARK_V11("dark-v11"),
    SATELLITE_V9("satellite-v9"),
    SATELLITE_STREETS_V12("satellite-streets-v12"),
    TRAFFIC_DAY_V2("traffic-day-v2"),
    TRAFFIC_NIGHT_V2("traffic-night-v2");

    companion object {
        fun toMapboxStyleUrl(value: String?): String =
            when (value) {
                STANDARD.value -> Style.MAPBOX_STREETS
                STANDARD_SATELLITE.value -> Style.STANDARD_SATELLITE
                STREETS_V12.value -> Style.MAPBOX_STREETS
                OUTDOORS_V12.value -> Style.OUTDOORS
                LIGHT_V11.value -> Style.LIGHT
                DARK_V11.value -> Style.DARK
                SATELLITE_V9.value -> Style.SATELLITE
                SATELLITE_STREETS_V12.value -> Style.SATELLITE_STREETS
                TRAFFIC_DAY_V2.value -> Style.TRAFFIC_DAY
                TRAFFIC_NIGHT_V2.value -> Style.TRAFFIC_NIGHT
                else -> Style.MAPBOX_STREETS
            }
    }
}
