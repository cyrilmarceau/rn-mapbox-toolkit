package com.rnmapboxtoolkit

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerInterface
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerDelegate
import com.mapbox.maps.MapView

@ReactModule(name = RnMapboxToolkitViewManager.NAME)
class RnMapboxToolkitViewManager : SimpleViewManager<RnMapboxToolkitView>(),
  RnMapboxToolkitViewManagerInterface<RnMapboxToolkitView> {
  private val mDelegate: ViewManagerDelegate<RnMapboxToolkitView>

  init {
    mDelegate = RnMapboxToolkitViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitView {
    return RnMapboxToolkitView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: RnMapboxToolkitView?, color: String?) {

  }

  companion object {
    const val NAME = "RnMapboxToolkitView"
  }
}
