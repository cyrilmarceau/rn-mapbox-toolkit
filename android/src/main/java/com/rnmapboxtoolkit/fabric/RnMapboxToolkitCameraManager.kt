package com.rnmapboxtoolkit.fabric

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCameraManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCameraManagerInterface

@ReactModule(name = RnMapboxToolkitCameraManager.NAME)
class RnMapboxToolkitCameraManager :
    SimpleViewManager<RnMapboxToolkitCamera>(),
    RnMapboxToolkitCameraManagerInterface<RnMapboxToolkitCamera> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitCamera> =
        RnMapboxToolkitCameraManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitCamera>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitCamera {
        return RnMapboxToolkitCamera(context)
    }

    companion object {
        const val NAME = "RnMapboxToolkitCamera"
    }
}
