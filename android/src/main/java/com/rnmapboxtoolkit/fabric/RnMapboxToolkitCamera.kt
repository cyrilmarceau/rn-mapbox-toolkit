package com.rnmapboxtoolkit.fabric
import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.plugin.animation.CameraAnimatorsFactory
import com.mapbox.maps.plugin.animation.easeTo
import com.mapbox.maps.plugin.animation.flyTo
import com.rnmapboxtoolkit.extensions.toAnimationOptions
import com.rnmapboxtoolkit.extensions.toCameraOptions
import org.json.JSONObject

@SuppressLint("ViewConstructor")
class RnMapboxToolkitCamera(context: ThemedReactContext) : AbstractMapFeature(context) {

    companion object {
        const val TAG = "RnMapboxToolkitCamera"
    }

    override fun addToMap(mapView: RnMapboxToolkitView) {
        super.addToMap(mapView)
    }

    override fun removeFromMap(
        mapView: RnMapboxToolkitView,
        reason: RemovalReason
    ): Boolean {
        return super.removeFromMap(mapView, reason)
    }


    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
    }

    fun getZoom(): Double? {
        return withMapView { mapView ->
            mapView.getZoom()
        }
    }

    fun flyTo(cameraOptions: String, animationOptions: String?) {
        val cameraJson = JSONObject(cameraOptions)
        val cameraOptions = cameraJson.toCameraOptions()

        val animOptions = animationOptions?.let {
            val animationJson = JSONObject(it)
            animationJson.toAnimationOptions()
        }

        mMapView?.getMapboxMap()?.flyTo(cameraOptions, animOptions)
    }

    fun easeTo(cameraOptions: String, animationOptions: String?) {
        val cameraJson = JSONObject(cameraOptions)
        val cameraOptions = cameraJson.toCameraOptions()

        val animOptions = animationOptions?.let {
            val animationJson = JSONObject(it)
            animationJson.toAnimationOptions()
        }

        mMapView?.getMapboxMap()?.easeTo(cameraOptions, animOptions)
    }
}
