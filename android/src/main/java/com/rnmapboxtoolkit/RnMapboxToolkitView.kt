package com.rnmapboxtoolkit

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.ViewGroup
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerInterface
import com.mapbox.maps.MapView
import com.mapbox.maps.Style
import com.mapbox.maps.CameraOptions
import com.mapbox.geojson.Point

class RnMapboxToolkitView : ViewGroup {

  companion object {
    const val TAG = "RnMapboxToolkitView"
  }

  private var mapView: MapView? = null

  init {
    Log.d(TAG, "Init")
    initializeMap()
  }

  constructor(context: Context?) : super(context)
  constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
  constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context,
    attrs,
    defStyleAttr
  )

  private fun initializeMap() {
    try {
      // Create MapView instance
      mapView = MapView(context).apply {
        layoutParams = LayoutParams(
          LayoutParams.MATCH_PARENT,
          LayoutParams.MATCH_PARENT
        )
        
        mapboxMap.loadStyle(Style.MAPBOX_STREETS) { style ->
          Log.d(TAG, "Map style loaded successfully")

          // Set initial camera position (San Francisco)
          val cameraOptions = CameraOptions.Builder()
            .center(Point.fromLngLat(2.333333, 48.866667))
            .zoom(15.0)
            .build()

          getMapboxMap().setCamera(cameraOptions)
        }
      }

      // Add MapView to this ViewGroup
      addView(mapView)

    } catch (e: Exception) {
      Log.e(TAG, "Error initializing map", e)
    }
  }


  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    mapView?.layout(0, 0, r - l, b - t)
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec)
    mapView?.measure(widthMeasureSpec, heightMeasureSpec)
  }
}
