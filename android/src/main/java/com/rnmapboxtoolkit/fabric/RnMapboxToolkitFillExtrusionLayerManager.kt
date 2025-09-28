package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitFillExtrusionLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitFillExtrusionLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitFillExtrusionLayerManager.NAME)
class RnMapboxToolkitFillExtrusionLayerManager :
    SimpleViewManager<RnMapboxToolkitFillExtrusionLayer>(),
    RnMapboxToolkitFillExtrusionLayerManagerInterface<RnMapboxToolkitFillExtrusionLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitFillExtrusionLayer> =
        RnMapboxToolkitFillExtrusionLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitFillExtrusionLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitFillExtrusionLayer {
        return RnMapboxToolkitFillExtrusionLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }


    override fun setLayerID(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitFillExtrusionLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitFillExtrusionLayer"
    }
}
