package com.rnmapboxtoolkit.fabric

import android.annotation.SuppressLint
import android.util.Log
import com.facebook.react.uimanager.ThemedReactContext
import com.mapbox.maps.Style
import com.mapbox.maps.coroutine.awaitStyle
import com.mapbox.maps.extension.style.terrain.generated.Terrain
import com.mapbox.maps.extension.style.terrain.generated.setTerrain
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch


@SuppressLint("ViewConstructor")
class RnMapboxToolkitTerrain(context: ThemedReactContext) : AbstractMapFeature(context) {
    companion object {
        const val TAG = "Terrain"
    }

    private var sourceID: String = "default-source-id"
    private var exaggeration: Double = 2.0


    private val job = Job()
    private val scope = CoroutineScope(Dispatchers.Main + job)

    override fun addToMap(mapView: RnMapboxToolkitView) {
        Log.d(TAG, "addToMap()")
        super.addToMap(mapView)
        updateTerrainToMap()
    }

    private fun updateTerrainToMap() {
        withMapView { mapView ->
            scope.launch {
                try {
                    addTerrainToMap(mapView)
                } catch (e: Exception) {
                    Log.e(TAG, "Failed to add source to map", e)
                }
            }
        }
    }

    private suspend fun addTerrainToMap(mapView: RnMapboxToolkitView) {
        val style = getMapStyle(mapView) ?: return

        val terrain = Terrain(sourceID).exaggeration(exaggeration)
        style.setTerrain(terrain)
    }

    private suspend fun getMapStyle(mapView: RnMapboxToolkitView): Style? {
        return mapView.getMapboxMap()?.awaitStyle()
    }

    fun setSourceID(value: String?) {
        value?.let {
            if (sourceID != it) {
                sourceID = it
                updateTerrainToMap()
            }
        }
    }

    fun setExaggeration(value: Double) {
        if (exaggeration != value) {
            exaggeration = value
            updateTerrainToMap()
        }
    }
}
