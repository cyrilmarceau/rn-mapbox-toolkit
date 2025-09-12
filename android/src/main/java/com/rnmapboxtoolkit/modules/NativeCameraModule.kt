package com.rnmapboxtoolkit.modules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.UIManagerHelper
import com.rnmapboxtoolkit.NativeCameraModuleSpec
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitCamera
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitView

@ReactModule(name = NativeCameraModule.NAME)
class NativeCameraModule(private val reactContext: ReactApplicationContext): NativeCameraModuleSpec(reactContext) {
    override fun getName(): String = "NativeCameraModule"

    companion object {
        const val NAME = "NativeCameraModule"
    }

    override fun getZoomLevel(viewTag: Double, promise: Promise) {
        try {
            UiThreadUtil.runOnUiThread {
                val uiManager = UIManagerHelper.getUIManager(reactContext, viewTag.toInt())
                val view = uiManager?.resolveView(viewTag.toInt()) as? RnMapboxToolkitCamera

                if (view != null) {
                    val zoomLevel = view.getZoom()
                    promise.resolve(zoomLevel)
                } else {
                    promise.reject("VIEW_NOT_FOUND", "Could not find Camera with tag: $viewTag")
                }
            }
        } catch (e: Exception) {
            promise.reject("GET_ZOOM_LEVEL_ERROR", "Error getting zoom level: ${e.message}")
        }
    }
}
