package com.rnmapboxtoolkit

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.util.Log
import android.view.ViewGroup
import com.mapbox.maps.MapView
import com.mapbox.maps.plugin.attribution.attribution
import com.mapbox.maps.plugin.attribution.generated.AttributionSettings
import com.mapbox.maps.plugin.logo.generated.LogoSettings
import com.mapbox.maps.plugin.logo.logo
import com.mapbox.maps.plugin.scalebar.generated.ScaleBarSettings
import com.mapbox.maps.plugin.scalebar.scalebar


class RnMapboxToolkitView : ViewGroup {

    companion object {
        const val TAG = "RnMapboxToolkitView"
    }

    private var mapView: MapView? = null

    init {
        Log.d(TAG, "Init")
        initializeMap()
        setupMapListeners()
    }


    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )
    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        mapView?.layout(0, 0, r - l, b - t)
    }
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        mapView?.measure(widthMeasureSpec, heightMeasureSpec)
    }



    private fun initializeMap() {
        try {
            mapView = MapView(context).apply {
                layoutParams = LayoutParams(
                    LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT
                )
            }
            addView(mapView)

        } catch (e: Exception) {
            Log.e(TAG, "Error initializing map", e)
        }
    }

    private fun setupMapListeners() {
        mapView?.mapboxMap?.subscribeStyleLoaded { st ->
            Log.d(TAG, "subscribeStyleLoaded >>> ${st}")
        }

        mapView?.mapboxMap?.subscribeStyleDataLoaded { st ->
            Log.d(TAG, "subscribeStyleDataLoaded >>> ${st.type}")
        }

        mapView?.mapboxMap?.addOnMapIdleListener { it
            Log.d(TAG, "addOnMapIdleListener >>> ${it}")
        }

        mapView?.mapboxMap?.subscribeMapIdle { it ->
            Log.d(TAG, "subscribeMapIdle >>> ${it}")
        }


    }


    fun setStyleURL(style: String) {
        mapView?.mapboxMap?.loadStyle(style) {st ->
            Log.d(TAG, "Map style loaded successfully with ${st.styleURI}")
        }
    }

    fun setShowScaleBar(value: Boolean) {
        mapView?.scalebar?.updateSettings {
            enabled = value
        }
    }

    fun setScaleBarOptions(block: ScaleBarSettings.Builder.() -> Unit) {
        mapView?.scalebar?.updateSettings(block)
    }

    fun setLogoOptions(block: (LogoSettings.Builder) -> Unit) {
        mapView?.logo?.updateSettings(block)
    }

    fun setAttributionOptions(block: (AttributionSettings.Builder) -> Unit) {
        mapView?.attribution?.updateSettings(block)
    }

}
