package com.rnmapboxtoolkit.fabric

import android.view.View
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitRasterDemSourceManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitRasterDemSourceManagerInterface
import com.rnmaps.fabric.event.OnShapePressEvent

@ReactModule(name = RnMapboxToolkitRasterDemSourceManager.NAME)
class RnMapboxToolkitRasterDemSourceManager :
    ViewGroupManager<RnMapboxToolkitRasterDemSource>(),
    RnMapboxToolkitRasterDemSourceManagerInterface<RnMapboxToolkitRasterDemSource> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitRasterDemSource> =
        RnMapboxToolkitRasterDemSourceManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitRasterDemSource>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitRasterDemSource {
        return RnMapboxToolkitRasterDemSource(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnShapePressEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnShapePressEvent.Companion.EVENT_NAME)
        )
    }

    override fun addView(parent: RnMapboxToolkitRasterDemSource, child: View, index: Int) {
        if (child is AbstractMapFeature) {
            parent.addChild(child)
        }
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: RnMapboxToolkitRasterDemSource, index: Int) {
        val child = parent.getChildAt(index)
        if (child is AbstractMapFeature) {
            parent.removeChild(child)
        }
        super.removeViewAt(parent, index)
    }

    override fun setUrl(
        view: RnMapboxToolkitRasterDemSource?,
        value: String?
    ) {
        view?.setUrl(value)
    }

    override fun setSourceID(
        view: RnMapboxToolkitRasterDemSource?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setMaxZoom(
        view: RnMapboxToolkitRasterDemSource?,
        value: Double
    ) {
        view?.setMaxZoom(value)
    }

    override fun setMinZoom(
        view: RnMapboxToolkitRasterDemSource?,
        value: Double
    ) {
        view?.setMinZoom(value)
    }

    override fun setTileSize(
        view: RnMapboxToolkitRasterDemSource?,
        value: Double
    ) {
        view?.setTileSize(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitRasterDemSource"
    }
}
