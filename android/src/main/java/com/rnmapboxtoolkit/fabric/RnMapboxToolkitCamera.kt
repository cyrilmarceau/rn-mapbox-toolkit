package com.rnmapboxtoolkit.fabric
import android.annotation.SuppressLint
import android.util.Log
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.CameraBoundsOptions
import com.mapbox.maps.MapboxMap
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

    /**
     * Default settings for bounds for avoid each new state is preserved when props change
     */
    private var pendingBounds = PendingBounds()

    data class PendingBounds(
        var maxPitch: Double? = null,
        var minPitch: Double? = null,
        var minZoom: Double? = null,
        var maxZoom: Double? = null
    )


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

        withMapView { mapView ->
            mapView.getMapboxMap()?.flyTo(cameraOptions, animOptions)
        }
    }

    fun easeTo(cameraOptions: String, animationOptions: String?) {
        val cameraJson = JSONObject(cameraOptions)
        val cameraOptions = cameraJson.toCameraOptions()

        val animOptions = animationOptions?.let {
            val animationJson = JSONObject(it)
            animationJson.toAnimationOptions()
        }

        withMapView { mapView ->
            mapView.getMapboxMap()?.easeTo(cameraOptions, animOptions)
        }
    }

    fun setMaxPitch(maxPitch: Double) {
        pendingBounds.maxPitch = maxPitch
        updateBounds()
    }

    fun setMinPitch(minPitch: Double) {
        pendingBounds.minPitch = minPitch
        updateBounds()
    }

    fun setMinZoom(minZoom: Double) {
        pendingBounds.minZoom = minZoom
        updateBounds()
    }

    fun setMaxZoom(maxZoom: Double) {
        pendingBounds.maxZoom = maxZoom
        updateBounds()
    }

    private fun updateBounds() {
        val builder = CameraBoundsOptions.Builder()

        pendingBounds.maxPitch?.let { builder.maxPitch(it) }
        pendingBounds.minPitch?.let { builder.minPitch(it) }
        pendingBounds.minZoom?.let { builder.minZoom(it) }
        pendingBounds.maxZoom?.let { builder.maxZoom(it) }

        withMapView { it ->
            it.getMapboxMap()?.setBounds(builder.build())
        }
    }
}


