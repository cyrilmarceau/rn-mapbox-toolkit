package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCircleLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitCircleLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitCircleLayerManager.NAME)
class RnMapboxToolkitCircleLayerManager :
    SimpleViewManager<RnMapboxToolkitCircleLayer>(),
    RnMapboxToolkitCircleLayerManagerInterface<RnMapboxToolkitCircleLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitCircleLayer> =
        RnMapboxToolkitCircleLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitCircleLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitCircleLayer {
        return RnMapboxToolkitCircleLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }

    override fun setLayerID(
        view: RnMapboxToolkitCircleLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitCircleLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitCircleLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitCircleLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitCircleLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitCircleLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitCircleLayer"
    }
}
