package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.SymbolLayer

@SuppressLint("ViewConstructor")
class RnMapboxToolkitSymbolLayer(context: ThemedReactContext) : AbstractLayer<SymbolLayer>(context) {

    companion object {
        const val TAG = "SymbolLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String?
    ): SymbolLayer {
        requireNotNull(sourceId) { "SymbolLayer requires a sourceId" }
        return SymbolLayer(layerId, sourceId)
    }
}


