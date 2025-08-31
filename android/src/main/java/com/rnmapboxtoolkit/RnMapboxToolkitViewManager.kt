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
import toAttributionSettingsBlock
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

    @ReactProp(name = "styleUrl")
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

    companion object {
        const val NAME = "RnMapboxToolkitView"
    }
}
