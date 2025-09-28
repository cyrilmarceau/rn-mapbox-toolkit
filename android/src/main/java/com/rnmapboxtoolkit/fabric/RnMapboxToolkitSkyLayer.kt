package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.SkyLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitSkyLayer(context: ThemedReactContext) : AbstractLayer<SkyLayer>(context) {
    companion object {
        const val TAG = "SkyLayer"
    }
    
    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): SkyLayer {
        return SkyLayer(layerId)
    }
}


