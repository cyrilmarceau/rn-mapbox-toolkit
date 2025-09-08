package com.rnmapboxtoolkit.modules

import android.view.View
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import com.rnmapboxtoolkit.NativeMapViewModuleSpec
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitView

@ReactModule(name = NativeMapViewModule.NAME)
class NativeMapViewModule(private val reactContext: ReactApplicationContext): NativeMapViewModuleSpec(reactContext) {
    override fun getName(): String = "NativeMapViewModule"

    companion object {
        const val NAME = "NativeMapViewModule"
    }

    override fun getZoomLevel(viewTag: Double, promise: Promise) {
        try {
            UiThreadUtil.runOnUiThread {
                val view = reactContext.currentActivity?.findViewById<RnMapboxToolkitView>(viewTag.toInt())

                if (view != null) {
                    val zoomLevel = view.getZoom()
                    promise.resolve(zoomLevel)
                } else {
                    promise.reject("VIEW_NOT_FOUND", "Could not find MapView with tag: $viewTag")
                }
            }
        } catch (e: Exception) {
            promise.reject("GET_ZOOM_LEVEL_ERROR", "Error getting zoom level: ${e.message}")
        }
    }


}
