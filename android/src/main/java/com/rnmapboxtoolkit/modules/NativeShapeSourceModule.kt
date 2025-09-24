package com.rnmapboxtoolkit.modules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.UIManagerHelper
import com.rnmapboxtoolkit.NativeShapeSourceModuleSpec
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitShapeSource

@ReactModule(name = NativeShapeSourceModule.NAME)
class NativeShapeSourceModule(private val reactContext: ReactApplicationContext) :
    NativeShapeSourceModuleSpec(reactContext) {
    override fun getName(): String = "NativeShapeSourceModule"

    override fun getGeoJsonClusterLeaves(
        viewTag: Double,
        feature: String,
        limit: Double,
        offset: Double,
        promise: Promise
    ) {
        try {
            UiThreadUtil.runOnUiThread {
                val uiManager = UIManagerHelper.getUIManager(reactContext, viewTag.toInt())
                val view = uiManager?.resolveView(viewTag.toInt()) as? RnMapboxToolkitShapeSource

                if (view != null) {
                    view.getGeoJsonClusterLeaves(feature, limit, offset) { features ->
                        if (features != null) {
                            promise.resolve(features)
                        } else {
                            promise.reject(
                                "CLUSTER_LEAVES_ERROR",
                                "Failed to get cluster leaves"
                            )
                        }
                    }
                } else {
                    promise.reject(
                        "VIEW_NOT_FOUND",
                        "Could not find ShapeSource with tag: $viewTag"
                    )
                }
            }
        } catch (e: Exception) {
            promise.reject(
                "GET_GEOJSON_CLUSTER_LEAVES_ERROR",
                "Error getting zoom level: ${e.message}"
            )
        }
    }

    override fun getGeoJsonClusterExpansionZoom(
        viewTag: Double,
        feature: String,
        promise: Promise
    ) {
        try {
            UiThreadUtil.runOnUiThread {
                val uiManager = UIManagerHelper.getUIManager(reactContext, viewTag.toInt())
                val view = uiManager?.resolveView(viewTag.toInt()) as? RnMapboxToolkitShapeSource

                if (view != null) {
                    view.getGeoJsonClusterExpansionZoom(feature) { zoom ->
                        zoom.let { it ->
                            if (it == -1) {
                                promise.reject(
                                    "CLUSTER_EXPANSION_ZOOM_ERROR",
                                    "Failed to get cluster expansion zoom"
                                )
                            } else {
                                promise.resolve(zoom)
                            }
                        }
                    }
                } else {
                    promise.reject(
                        "VIEW_NOT_FOUND",
                        "Could not find ShapeSource with tag: $viewTag"
                    )
                }
            }
        } catch (e: Exception) {
            promise.reject(
                "GET_GEOJSON_CLUSTER_LEAVES_ERROR",
                "Error getting zoom level: ${e.message}"
            )
        }
    }

    override fun getGeoJsonClusterChildren(
        viewTag: Double,
        feature: String,
        promise: Promise
    ) {
        try {
            UiThreadUtil.runOnUiThread {
                val uiManager = UIManagerHelper.getUIManager(reactContext, viewTag.toInt())
                val view = uiManager?.resolveView(viewTag.toInt()) as? RnMapboxToolkitShapeSource

                if (view != null) {
                    view.getGeoJsonClusterChildren(feature) { features ->
                        if (features != null) {
                            promise.resolve(features)
                        } else {
                            promise.reject(
                                "CLUSTER_CHILDREN_ERROR",
                                "Failed to get cluster children"
                            )
                        }
                    }
                } else {
                    promise.reject(
                        "VIEW_NOT_FOUND",
                        "Could not find ShapeSource with tag: $viewTag"
                    )
                }
            }
        } catch (e: Exception) {
            promise.reject(
                "GET_GEOJSON_CLUSTER_LEAVES_ERROR",
                "Error getting zoom level: ${e.message}"
            )
        }
    }

    companion object {
        const val NAME = "NativeShapeSourceModule"
    }
}
