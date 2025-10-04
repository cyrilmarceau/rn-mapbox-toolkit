package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitHillshadeLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitHillshadeLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitHillShadeLayerManager.NAME)
class RnMapboxToolkitHillShadeLayerManager :
    SimpleViewManager<RnMapboxToolkitHillshadeLayer>(),
    RnMapboxToolkitHillshadeLayerManagerInterface<RnMapboxToolkitHillshadeLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitHillshadeLayer> =
        RnMapboxToolkitHillshadeLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitHillshadeLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitHillshadeLayer {
        return RnMapboxToolkitHillshadeLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }

    override fun setLayerID(
        view: RnMapboxToolkitHillshadeLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitHillshadeLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitHillshadeLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitHillshadeLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }


    override fun setLayerStyle(
        view: RnMapboxToolkitHillshadeLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitHillshadeLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitHillshadeLayer"
    }
}
