package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.FillExtrusionLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitFillExtrusionLayer(context: ThemedReactContext) :
    AbstractLayer<FillExtrusionLayer>(context) {
    companion object {
        const val TAG = "FillExtrusionLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): FillExtrusionLayer {
        requireNotNull(sourceId) {
            "FillExtrusionLayer requires a sourceId"
        }
        return FillExtrusionLayer(layerId, sourceId).sourceLayer("building")
    }
}


