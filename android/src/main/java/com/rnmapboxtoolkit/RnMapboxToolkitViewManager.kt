package com.rnmapboxtoolkit

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerInterface
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerDelegate
import com.rnmapboxtoolkit.mapper.MapStyleURL
import com.rnmaps.fabric.event.OnMapIdleEvent
import com.rnmaps.fabric.event.OnMapLoadedEvent
import com.rnmaps.fabric.event.OnMapLoadingErrorEvent
import com.rnmaps.fabric.event.OnRenderFrameFinishedEvent
import com.rnmaps.fabric.event.OnRenderFrameStartedEvent
import com.rnmaps.fabric.event.OnSourceAddedEvent
import com.rnmaps.fabric.event.OnSourceRemovedEvent
import com.rnmaps.fabric.event.OnStyleDataLoadedEvent
import com.rnmaps.fabric.event.OnStyleImageMissingEvent
import com.rnmaps.fabric.event.OnStyleLoadedEvent
import toAttributionSettingsBlock
import toCompassSettingsBlock
import toGestureSettingsBlock
import toLogoSettingsBlock
import toScaleBarSettingsBlock


@ReactModule(name = RnMapboxToolkitViewManager.NAME)
class RnMapboxToolkitViewManager : SimpleViewManager<RnMapboxToolkitView>(),
    RnMapboxToolkitViewManagerInterface<RnMapboxToolkitView> {
    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitView> =
        RnMapboxToolkitViewManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitView>? {
        return mDelegate
    }

    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitView {
        return RnMapboxToolkitView(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnMapIdleEvent.EVENT_NAME to mapOf("registrationName" to OnMapIdleEvent.EVENT_NAME),
            OnStyleLoadedEvent.EVENT_NAME to mapOf("registrationName" to OnStyleLoadedEvent.EVENT_NAME),
            OnMapLoadedEvent.EVENT_NAME to mapOf("registrationName" to OnMapLoadedEvent.EVENT_NAME),
            OnMapLoadingErrorEvent.EVENT_NAME to mapOf("registrationName" to OnMapLoadingErrorEvent.EVENT_NAME),
            OnRenderFrameFinishedEvent.EVENT_NAME to mapOf("registrationName" to OnRenderFrameFinishedEvent.EVENT_NAME),
            OnRenderFrameStartedEvent.EVENT_NAME to mapOf("registrationName" to OnRenderFrameStartedEvent.EVENT_NAME),
            OnSourceAddedEvent.EVENT_NAME to mapOf("registrationName" to OnSourceAddedEvent.EVENT_NAME),
            OnStyleDataLoadedEvent.EVENT_NAME to mapOf("registrationName" to OnStyleDataLoadedEvent.EVENT_NAME),
            OnStyleImageMissingEvent.EVENT_NAME to mapOf("registrationName" to OnStyleImageMissingEvent.EVENT_NAME),
            OnSourceRemovedEvent.EVENT_NAME to mapOf("registrationName" to OnSourceRemovedEvent.EVENT_NAME),

        )
    }



    @ReactProp(name = "color")
    override fun setColor(view: RnMapboxToolkitView?, color: String?) {

    }

    @ReactProp(name = "styleUrl")
    override fun setStyleUrl(
        view: RnMapboxToolkitView?,
        value: String?
    ) {
        val style = MapStyleURL.toMapboxStyleUrl(value)
        view?.setStyleURL(style)

    }

    @ReactProp(name = "showScaleBar")
    override fun setShowScaleBar(
        view: RnMapboxToolkitView?,
        value: Boolean
    ) {
        view?.setShowScaleBar(value)
    }

    @ReactProp(name = "scaleBarOptions")
    override fun setScaleBarOptions(
        view: RnMapboxToolkitView?,
        value: ReadableMap?
    ) {
        val scaleBarSettingsBlock = value.toScaleBarSettingsBlock()
        scaleBarSettingsBlock?.let { block ->
            view?.setScaleBarOptions(block)
        }
    }

    @ReactProp(name = "logoOptions")
    override fun setLogoOptions(
        view: RnMapboxToolkitView?,
        value: ReadableMap?
    ) {
        val logoSettingsBlock = value.toLogoSettingsBlock()
        logoSettingsBlock?.let { block ->
            view?.setLogoOptions(block)
        }
    }

    @ReactProp(name = "attributionOptions")
    override fun setAttributionOptions(
        view: RnMapboxToolkitView?,
        value: ReadableMap?
    ) {
        val attributionSettingsBlock = value.toAttributionSettingsBlock()
        attributionSettingsBlock?.let { block ->
            view?.setAttributionOptions(block)
        }
    }

    @ReactProp(name = "compassOptions")
    override fun setCompassOptions(
        view: RnMapboxToolkitView?,
        value: ReadableMap?
    ) {
        val compassSettingsBlock = value?.toCompassSettingsBlock()
        compassSettingsBlock?.let { block ->
            view?.setCompassOptions(block)
        }
    }

    @ReactProp(name = "gestureOptions")
    override fun setGestureOptions(
        view: RnMapboxToolkitView?,
        value: ReadableMap?
    ) {
        val gestureSettingsBlock = value?.toGestureSettingsBlock()
        gestureSettingsBlock?.let { block ->
            view?.setGestureOptions(block)
        }
    }

    companion object {
        const val NAME = "RnMapboxToolkitView"
    }
}
