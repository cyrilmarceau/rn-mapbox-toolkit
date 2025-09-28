package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.BackgroundLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitBackgroundLayer(context: ThemedReactContext) :
    AbstractLayer<BackgroundLayer>(context) {
    companion object {
        const val TAG = "BackgroundLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): BackgroundLayer {
        return BackgroundLayer(layerId)
    }
}


