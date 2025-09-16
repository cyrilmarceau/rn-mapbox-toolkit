package com.rnmapboxtoolkit.fabric

import android.view.View
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitShapeSourceManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitShapeSourceManagerInterface

@ReactModule(name = RnMapboxToolkitShapeSourceManager.NAME)
class RnMapboxToolkitShapeSourceManager :
    ViewGroupManager<RnMapboxToolkitShapeSource>(),
    RnMapboxToolkitShapeSourceManagerInterface<RnMapboxToolkitShapeSource> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitShapeSource> =
        RnMapboxToolkitShapeSourceManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitShapeSource>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitShapeSource {
        return RnMapboxToolkitShapeSource(context)
    }

    override fun addView(parent: RnMapboxToolkitShapeSource, child: View, index: Int) {
        if (child is AbstractMapFeature) {
            parent.addChild(child)
        }
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: RnMapboxToolkitShapeSource, index: Int) {
        val child = parent.getChildAt(index)
        if (child is AbstractMapFeature) {
            parent.removeChild(child)
        }
        super.removeViewAt(parent, index)
    }

    override fun setShape(
        view: RnMapboxToolkitShapeSource?,
        shape: String?
    ) {
        view?.setShape(shape)
    }

    override fun setSourceID(
        view: RnMapboxToolkitShapeSource?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitShapeSource"
    }
}
