package com.rnmapboxtoolkit.fabric


import android.annotation.SuppressLint
import android.util.Log
import com.bumptech.glide.Glide
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.Style
import com.mapbox.maps.coroutine.awaitStyle
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


@SuppressLint("ViewConstructor")
class RnMapboxToolkitImages(context: ThemedReactContext) : AbstractMapFeature(context) {

    companion object {
        const val TAG = "RnMapboxToolkitImages"
    }

    // Local data class for getting type from ReadableArray to this in ViewManager
    data class MapboxImage(val name: String, val uri: String, val sdf: Boolean = false)

    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)

    override fun addToMap(mapView: RnMapboxToolkitView) {
        super.addToMap(mapView)
    }

    override fun removeFromMap(
        mapView: RnMapboxToolkitView,
        reason: RemovalReason
    ): Boolean {
        return super.removeFromMap(mapView, reason)
    }


    fun setImages(images: List<MapboxImage>) {
        withMapView { mapView ->
            scope.launch {
                val style = getMapStyle(mapView) ?: return@launch
                addImageToStyle(style, images)
            }
        }
    }

    private suspend fun addImageToStyle(style: Style, images: List<MapboxImage>) {
        try {
            images.forEach { image ->
                val img = withContext(Dispatchers.IO) {
                    Glide.with(context)
                        .asBitmap()
                        .load(image.uri)
                        .submit()
                        .get()
                }
                withContext(Dispatchers.Main) {
                    style.addImage(image.name, img, image.sdf)
                }
            }

        } catch (e: Exception) {
            Log.e(TAG, "Failed to add image to style", e)
        }
    }


    private suspend fun getMapStyle(mapView: RnMapboxToolkitView): Style? {
        return mapView.getMapboxMap()?.awaitStyle()
    }
}


