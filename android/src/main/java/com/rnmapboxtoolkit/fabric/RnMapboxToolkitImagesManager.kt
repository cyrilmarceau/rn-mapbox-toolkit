package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitImagesManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitImagesManagerInterface
import com.rnmapboxtoolkit.extensions.toMapboxImages

@ReactModule(name = RnMapboxToolkitImagesManager.NAME)
class RnMapboxToolkitImagesManager :
    SimpleViewManager<RnMapboxToolkitImages>(),
    RnMapboxToolkitImagesManagerInterface<RnMapboxToolkitImages> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitImages> =
        RnMapboxToolkitImagesManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitImages>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitImages {
        return RnMapboxToolkitImages(context)
    }

    override fun setImages(view: RnMapboxToolkitImages, images: ReadableArray?) {
        val mbxImages = images?.toMapboxImages() ?: emptyList()

        view.setImages(mbxImages)
    }

    companion object {
        const val NAME = "RnMapboxToolkitImages"
    }
}
