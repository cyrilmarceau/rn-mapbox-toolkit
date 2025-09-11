package com.rnmapboxtoolkit.fabric

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitViewManagerInterface
import com.rnmapboxtoolkit.mapper.MapStyleURL
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
import toAttributionSettingsBlock
import toCompassSettingsBlock
import toGestureSettingsBlock
import toLogoSettingsBlock
import toScaleBarSettingsBlock

@ReactModule(name = RnMapboxToolkitViewManager.NAME)
class RnMapboxToolkitViewManager :
    ViewGroupManager<RnMapboxToolkitView>(),
    RnMapboxToolkitViewManagerInterface<RnMapboxToolkitView> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitView> =
        RnMapboxToolkitViewManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitView>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitView {
        return RnMapboxToolkitView(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnMapIdleEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnMapIdleEvent.Companion.EVENT_NAME),
            OnStyleLoadedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnStyleLoadedEvent.Companion.EVENT_NAME),
            OnMapLoadedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnMapLoadedEvent.Companion.EVENT_NAME),
            OnMapLoadingErrorEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnMapLoadingErrorEvent.Companion.EVENT_NAME),
            OnRenderFrameFinishedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnRenderFrameFinishedEvent.Companion.EVENT_NAME),
            OnRenderFrameStartedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnRenderFrameStartedEvent.Companion.EVENT_NAME),
            OnSourceAddedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnSourceAddedEvent.Companion.EVENT_NAME),
            OnStyleDataLoadedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnStyleDataLoadedEvent.Companion.EVENT_NAME),
            OnStyleImageMissingEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnStyleImageMissingEvent.Companion.EVENT_NAME),
            OnSourceRemovedEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnSourceRemovedEvent.Companion.EVENT_NAME),
            OnMapClickListenerEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnMapClickListenerEvent.Companion.EVENT_NAME),
            OnMapLongClickListenerEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnMapLongClickListenerEvent.Companion.EVENT_NAME),
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
        val style = MapStyleURL.Companion.toMapboxStyleUrl(value)
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
