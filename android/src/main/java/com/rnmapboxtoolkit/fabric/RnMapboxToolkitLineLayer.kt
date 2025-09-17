package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.LineLayer


@SuppressLint("ViewConstructor")
class RnMapboxToolkitLineLayer(context: ThemedReactContext) : AbstractLayer<LineLayer>(context) {

    companion object {
        const val TAG = "LineLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String
    ): LineLayer {
        return LineLayer(layerId, sourceId)
    }

}


