package com.rnmapboxtoolkit.fabric

import android.content.Context
import com.facebook.react.views.view.ReactViewGroup
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitView


// Source of this file : https://github.com/rnmapbox/maps/blob/b21565f56c858a91ed695650b1ac4a07fcb23098/android/src/main/java/com/rnmapbox/rnmbx/components/AbstractMapFeature.kt
enum class RemovalReason {
    VIEW_REMOVAL,
    STYLE_CHANGE,
    ON_DESTROY,
    REORDER
}

abstract class AbstractMapFeature(context: Context?) : ReactViewGroup(context) {
    protected var mMapView: RnMapboxToolkitView? = null
    private var mWithMapViewCallbacks: MutableList<(RnMapboxToolkitView) -> Unit> = mutableListOf()

    open fun addToMap(mapView: RnMapboxToolkitView) {
        mMapView = mapView

        mWithMapViewCallbacks.forEach { it(mapView) }
        mWithMapViewCallbacks.clear()
    }

    open fun removeFromMap(mapView: RnMapboxToolkitView, reason: RemovalReason): Boolean {
        mMapView = null
        return true
    }

    internal fun <T> withMapView(callback: (mapView: RnMapboxToolkitView) -> T): T? {
        val mapView = mMapView
        return if (mapView == null) {
            mWithMapViewCallbacks.add { callback(it) }
            null
        } else {
            callback(mapView)
        }
    }
}
