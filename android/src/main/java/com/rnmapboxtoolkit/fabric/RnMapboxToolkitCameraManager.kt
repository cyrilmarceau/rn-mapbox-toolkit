package com.rnmapboxtoolkit.fabric

import android.util.Log
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCameraManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCameraManagerInterface
import com.rnmapboxtoolkit.extensions.toCameraOptions
import org.json.JSONObject

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

    override fun flyTo(view: RnMapboxToolkitCamera, cameraOptions: String, animationOptions: String?) {
        view.flyTo(cameraOptions, animationOptions)
    }

    override fun easeTo(view: RnMapboxToolkitCamera, cameraOptions: String, animationOptions: String?) {
        view.easeTo(cameraOptions, animationOptions)
    }

    companion object {
        const val NAME = "RnMapboxToolkitCamera"
    }
}
