package com.rnmapboxtoolkit.fabric

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitShapeSourceManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitShapeSourceManagerInterface
import com.rnmaps.fabric.event.OnShapePressEvent

@ReactModule(name = RnMapboxToolkitShapeSourceManager.NAME)
class RnMapboxToolkitShapeSourceManager :
    ViewGroupManager<RnMapboxToolkitShapeSource>(),
    RnMapboxToolkitShapeSourceManagerInterface<RnMapboxToolkitShapeSource> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitShapeSource> =
        RnMapboxToolkitShapeSourceManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitShapeSource>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitShapeSource {
        return RnMapboxToolkitShapeSource(context)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String?, Any?>? {
        return mapOf(
            OnShapePressEvent.Companion.EVENT_NAME to mapOf("registrationName" to OnShapePressEvent.Companion.EVENT_NAME)
        )
    }

    override fun addView(parent: RnMapboxToolkitShapeSource, child: View, index: Int) {
        if (child is AbstractMapFeature) {
            parent.addChild(child)
        }
        super.addView(parent, child, index)
    }

    override fun removeViewAt(parent: RnMapboxToolkitShapeSource, index: Int) {
        val child = parent.getChildAt(index)
        if (child is AbstractMapFeature) {
            parent.removeChild(child)
        }
        super.removeViewAt(parent, index)
    }

    override fun setShape(
        view: RnMapboxToolkitShapeSource?,
        shape: String?
    ) {
        view?.setShape(shape)
    }

    override fun setSourceID(
        view: RnMapboxToolkitShapeSource?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setBuffer(
        view: RnMapboxToolkitShapeSource?,
        value: Double
    ) {
        view?.setBuffer(value)
    }

    override fun setTolerance(
        view: RnMapboxToolkitShapeSource?,
        value: Double
    ) {
        view?.setTolerance(value)
    }

    override fun setCluster(
        view: RnMapboxToolkitShapeSource?,
        value: Boolean
    ) {
        view?.setCluster(value)
    }

    override fun setClusterRadius(
        view: RnMapboxToolkitShapeSource?,
        value: Double
    ) {
        view?.setClusterRadius(value)
    }

    override fun setClusterMaxZoom(
        view: RnMapboxToolkitShapeSource?,
        value: Double
    ) {
        view?.setClusterMaxZoom(value)
    }

    override fun setClusterMinPoints(
        view: RnMapboxToolkitShapeSource?,
        value: Double
    ) {
        view?.setClusterMinPoints(value)
    }

    override fun setHitSlopArea(
        view: RnMapboxToolkitShapeSource?,
        value: ReadableMap?
    ) {
        view?.setHitSlopArea(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitShapeSource"
    }
}
