package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitSkyLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitSkyLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitSkyLayerManager.NAME)
class RnMapboxToolkitSkyLayerManager :
    SimpleViewManager<RnMapboxToolkitSkyLayer>(),
    RnMapboxToolkitSkyLayerManagerInterface<RnMapboxToolkitSkyLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitSkyLayer> =
        RnMapboxToolkitSkyLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitSkyLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitSkyLayer {
        return RnMapboxToolkitSkyLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }


    override fun setLayerID(
        view: RnMapboxToolkitSkyLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitSkyLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitSkyLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitSkyLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitSkyLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitSkyLayer"
    }
}
