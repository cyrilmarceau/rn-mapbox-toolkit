package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitHeatmapLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitHeatmapLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent

@ReactModule(name = RnMapboxToolkitHeatmapLayerManager.NAME)
class RnMapboxToolkitHeatmapLayerManager :
    SimpleViewManager<RnMapboxToolkitHeatmapLayer>(),
    RnMapboxToolkitHeatmapLayerManagerInterface<RnMapboxToolkitHeatmapLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitHeatmapLayer> =
        RnMapboxToolkitHeatmapLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitHeatmapLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitHeatmapLayer {
        return RnMapboxToolkitHeatmapLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }
    
    override fun setLayerID(
        view: RnMapboxToolkitHeatmapLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitHeatmapLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitHeatmapLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitHeatmapLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }


    override fun setLayerStyle(
        view: RnMapboxToolkitHeatmapLayer?,
        value: String?
    ) {
        view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitHeatmapLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitHeatmapLayer"
    }
}
