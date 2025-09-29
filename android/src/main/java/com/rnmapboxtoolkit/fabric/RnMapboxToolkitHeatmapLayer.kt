package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.HeatmapLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitHeatmapLayer(context: ThemedReactContext) :
    AbstractLayer<HeatmapLayer>(context) {
    companion object {
        const val TAG = "HeatmapLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): HeatmapLayer {
        requireNotNull(sourceId) {
            "HeatmapLayer requires a sourceId"
        }
        
        return HeatmapLayer(layerId, sourceId)
    }
}


