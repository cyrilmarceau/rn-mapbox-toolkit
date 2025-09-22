package com.rnmapboxtoolkit.fabric

import android.content.Context
import android.util.Log
import com.facebook.react.views.view.ReactViewGroup
import com.mapbox.geojson.Point
import com.mapbox.maps.plugin.gestures.OnMapClickListener

// Source of this file : https://github.com/rnmapbox/maps/blob/b21565f56c858a91ed695650b1ac4a07fcb23098/android/src/main/java/com/rnmapbox/rnmbx/components/AbstractMapFeature.kt
enum class RemovalReason {
    VIEW_REMOVAL,
    STYLE_CHANGE,
    ON_DESTROY,
    REORDER
}

abstract class AbstractMapFeature(context: Context?) : ReactViewGroup(context), OnMapClickListener {

    companion object {
        /**
         * Share layerIDS across multiple instance
         */
        private val sourceLayerIDS: MutableList<String> = mutableListOf()

        fun getSourceLayerIDS(): List<String> = sourceLayerIDS

        fun addLayerID(layerID: String) {
            Log.d("AbstractMapFeature", "addLayerID ${layerID}")
            sourceLayerIDS.add(layerID)
        }
    }

    protected var mMapView: RnMapboxToolkitView? = null
    private var mWithMapViewCallbacks: MutableList<(RnMapboxToolkitView) -> Unit> = mutableListOf()


    override fun onMapClick(point: Point): Boolean {
        return false
    }

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

    open fun addChild(child: AbstractMapFeature) {}
    open fun removeChild(child: AbstractMapFeature) {}
}
