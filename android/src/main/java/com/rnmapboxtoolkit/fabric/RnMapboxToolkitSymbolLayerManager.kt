package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitSymbolLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitSymbolLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitSymbolLayerManager.NAME)
class RnMapboxToolkitSymbolLayerManager :
    SimpleViewManager<RnMapboxToolkitSymbolLayer>(),
    RnMapboxToolkitSymbolLayerManagerInterface<RnMapboxToolkitSymbolLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitSymbolLayer> =
        RnMapboxToolkitSymbolLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitSymbolLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitSymbolLayer {
        return RnMapboxToolkitSymbolLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }

    override fun setLayerID(
        view: RnMapboxToolkitSymbolLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitSymbolLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitSymbolLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitSymbolLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitSymbolLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitSymbolLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitSymbolLayer"
    }
}
