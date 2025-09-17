package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.FillLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitFillLayer(context: ThemedReactContext) : AbstractLayer<FillLayer>(context) {

    companion object {
        const val TAG = "FillLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String
    ): FillLayer {
        return FillLayer(layerId, sourceId)
    }
}


