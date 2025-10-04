package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.HillshadeLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitHillshadeLayer(context: ThemedReactContext) :
    AbstractLayer<HillshadeLayer>(context) {
    companion object {
        const val TAG = "HillShadeLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): HillshadeLayer {
        requireNotNull(sourceId) {
            "HillShadeLayer requires a sourceId"
        }

        return HillshadeLayer(layerId, sourceId)
    }
}


