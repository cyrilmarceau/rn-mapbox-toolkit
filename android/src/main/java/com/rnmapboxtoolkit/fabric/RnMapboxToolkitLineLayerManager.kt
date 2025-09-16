package com.rnmapboxtoolkit.fabric

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitLineLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitLineLayerManagerInterface

@ReactModule(name = RnMapboxToolkitLineLayerManager.NAME)
class RnMapboxToolkitLineLayerManager :
    SimpleViewManager<RnMapboxToolkitLineLayer>(),
    RnMapboxToolkitLineLayerManagerInterface<RnMapboxToolkitLineLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitLineLayer> =
        RnMapboxToolkitLineLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitLineLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitLineLayer {
        return RnMapboxToolkitLineLayer(context)
    }

    override fun setLayerID(
        view: RnMapboxToolkitLineLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitLineLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitLineLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitLineLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitLineLayer?,
        value: String?
    ) {
    view?.setLayerStyle(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitLineLayer"
    }
}
