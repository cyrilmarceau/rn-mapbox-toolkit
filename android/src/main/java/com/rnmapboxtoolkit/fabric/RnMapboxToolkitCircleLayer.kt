package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.extension.style.layers.generated.CircleLayer


@SuppressLint("ViewConstructor")
class RnMapboxToolkitCircleLayer(context: ThemedReactContext) : AbstractLayer<CircleLayer>(context) {

    companion object {
        const val TAG = "CircleLayer"
    }

    override fun createLayer(
        layerId: String,
        sourceId: String
    ): CircleLayer {
        return CircleLayer(layerId, sourceId)
    }



}


