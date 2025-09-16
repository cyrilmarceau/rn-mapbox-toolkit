package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import android.graphics.Color
import android.util.Log
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.layers.addLayer
import com.mapbox.maps.extension.style.layers.generated.LineLayer
import com.mapbox.maps.extension.style.layers.getLayer
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch


@SuppressLint("ViewConstructor")
class RnMapboxToolkitLineLayer(context: ThemedReactContext) : AbstractMapFeature(context) {

    companion object {
        const val TAG = "LineLayer"
    }


    override fun addToMap(mapView: RnMapboxToolkitView) {
        Log.d(TAG, "addToMap")
        super.addToMap(mapView)
        scope.launch {
            withMapView { map ->
                scope.launch {
                    map.getMapboxMap()?.awaitStyle()?.let { style ->
                        sourceID?.let { srcId ->
                            val id = layerID ?: "line-layer"

                            // Don't create new layer if one already exist
                            if(style.getLayer(id) != null) return@launch

                            val layer = LineLayer(id, srcId)
                                .lineWidth(3.0)
                                .lineColor(Color.BLUE)

                            style.addLayer(layer)
                        }
                    }
                }
            }
        }
    }


    private var sourceID: String? = null
    private var layerID: String? = null


    fun setSourceID(value: String?) {
        this.sourceID = value
    }

    fun setLayerID(value: String?) {
        this.layerID = value
    }

    fun setLayerStyle(value: String?) {}
    fun setMaxZoom(value: Double) {}
    fun setMinZoom(value: Double) {}

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)
}


