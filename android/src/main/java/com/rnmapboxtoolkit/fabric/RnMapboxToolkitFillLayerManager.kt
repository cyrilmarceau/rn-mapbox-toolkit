package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.Dynamic
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitFillLayerManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitFillLayerManagerInterface
import com.rnmaps.fabric.event.OnLayerStyleErrorEvent
import com.rnmaps.fabric.event.OnMapClickListenerEvent
import com.rnmaps.fabric.event.OnMapIdleEvent
import com.rnmaps.fabric.event.OnMapLoadedEvent
import com.rnmaps.fabric.event.OnMapLoadingErrorEvent
import com.rnmaps.fabric.event.OnMapLongClickListenerEvent
import com.rnmaps.fabric.event.OnRenderFrameFinishedEvent
import com.rnmaps.fabric.event.OnRenderFrameStartedEvent
import com.rnmaps.fabric.event.OnSourceAddedEvent
import com.rnmaps.fabric.event.OnSourceRemovedEvent
import com.rnmaps.fabric.event.OnStyleDataLoadedEvent
import com.rnmaps.fabric.event.OnStyleImageMissingEvent
import com.rnmaps.fabric.event.OnStyleLoadedEvent

@ReactModule(name = RnMapboxToolkitFillLayerManager.NAME)
class RnMapboxToolkitFillLayerManager :
    SimpleViewManager<RnMapboxToolkitFillLayer>(),
    RnMapboxToolkitFillLayerManagerInterface<RnMapboxToolkitFillLayer> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitFillLayer> =
        RnMapboxToolkitFillLayerManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitFillLayer>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitFillLayer {
        return RnMapboxToolkitFillLayer(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnLayerStyleErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnLayerStyleErrorEvent.Companion.EVENT_NAME),
        )
    }

    override fun setLayerID(
        view: RnMapboxToolkitFillLayer?,
        value: String?
    ) {
        view?.setLayerID(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitFillLayer?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitFillLayer?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitFillLayer?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setLayerStyle(
        view: RnMapboxToolkitFillLayer?,
        value: String?
    ) {
    view?.setLayerStyle(value)
    }

    override fun setFilter(
        view: RnMapboxToolkitFillLayer?,
        value: Dynamic?
    ) {
        view?.setFilter(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitFillLayer"
    }
}
