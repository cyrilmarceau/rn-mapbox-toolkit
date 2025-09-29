package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitBackgroundLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitBackgroundLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitBackgroundLayerManager.NAME)
class RnMapboxToolkitBackgroundLayerManager :
    SimpleViewManager<RnMapboxToolkitBackgroundLayer>(),
    RnMapboxToolkitBackgroundLayerManagerInterface<RnMapboxToolkitBackgroundLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitBackgroundLayer> =
        RnMapboxToolkitBackgroundLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitBackgroundLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitBackgroundLayer {
        return RnMapboxToolkitBackgroundLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }


    override fun setLayerID(
        view: RnMapboxToolkitBackgroundLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitBackgroundLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitBackgroundLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitBackgroundLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitBackgroundLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitBackgroundLayer"
    }
}
