package com.rnmapboxtoolkit.fabric

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.views.view.ReactViewGroup
import com.mapbox.common.Cancelable
import com.mapbox.maps.EdgeInsets
import com.mapbox.maps.MapView
import com.mapbox.maps.MapboxMap
import com.mapbox.maps.plugin.PuckBearing
import com.mapbox.maps.plugin.attribution.attribution
import com.mapbox.maps.plugin.attribution.generated.AttributionSettings
import com.mapbox.maps.plugin.compass.compass
import com.mapbox.maps.plugin.compass.generated.CompassSettings
import com.mapbox.maps.plugin.gestures.OnMapClickListener
import com.mapbox.maps.plugin.gestures.OnMapLongClickListener
import com.mapbox.maps.plugin.gestures.generated.GesturesSettings
import com.mapbox.maps.plugin.gestures.gestures
import com.mapbox.maps.plugin.locationcomponent.location
import com.mapbox.maps.plugin.logo.generated.LogoSettings
import com.mapbox.maps.plugin.logo.logo
import com.mapbox.maps.plugin.scalebar.generated.ScaleBarSettings
import com.mapbox.maps.plugin.scalebar.scalebar
import com.mapbox.maps.plugin.viewport.data.FollowPuckViewportStateBearing
import com.mapbox.maps.plugin.viewport.data.FollowPuckViewportStateOptions
import com.mapbox.maps.plugin.viewport.state.FollowPuckViewportState
import com.mapbox.maps.plugin.viewport.viewport

import com.rnmapboxtoolkit.extensions.toReadableMap
import com.rnmaps.fabric.event.OnMapClickListenerEvent
import com.rnmaps.fabric.event.OnMapIdleEvent
import com.rnmaps.fabric.event.OnMapLoadedEvent
import com.rnmaps.fabric.event.OnMapLoadingErrorEvent
import com.rnmaps.fabric.event.OnMapLongClickListenerEvent
import com.rnmaps.fabric.event.OnRenderFrameFinishedEvent
import com.rnmaps.fabric.event.OnRenderFrameStartedEvent
import com.rnmaps.fabric.event.OnSourceAddedEvent
import com.rnmaps.fabric.event.OnSourceRemovedEvent
import com.rnmaps.fabric.event.OnStyleDataLoadedEvent
import com.rnmaps.fabric.event.OnStyleImageMissingEvent
import com.rnmaps.fabric.event.OnStyleLoadedEvent

class RnMapboxToolkitView(private val context: ThemedReactContext) : ReactViewGroup(context)  {

    companion object {
        const val TAG = "RnMapboxToolkitView"
    }


    private var mapView: MapView? = null
    private val subscriptions = mutableListOf<Cancelable>()
    private val gestureListeners = mutableListOf<Any>()
    private val mapFeatures = mutableListOf<AbstractMapFeature>()

    init {
        initialize()
    }

    fun getMapboxMap(): MapboxMap? = mapView?.mapboxMap

    override fun addView(child: View?, index: Int) {
        if (child is AbstractMapFeature) {
            mapFeatures.add(child)
            child.addToMap(this)
        } else {
            super.addView(child, index)
        }
    }

    override fun removeView(child: View?) {
        if (child is AbstractMapFeature) {
            mapFeatures.remove(child)
            child.removeFromMap(this, RemovalReason.VIEW_REMOVAL)
        } else {
            super.removeView(child)
        }
    }

    private fun initialize() {
        Log.d(TAG, "Initializing RnMapboxToolkitView")
        try {
            initializeMap()
            setupMapListeners()
            setupGestureListeners()
        } catch (e: Exception) {
            Log.e(TAG, "Error during initialization", e)
        }
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        mapView?.layout(0, 0, r - l, b - t)
    }
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        mapView?.measure(widthMeasureSpec, heightMeasureSpec)
    }
    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        cleanupMapListeners()
        cleanupGestureListeners()

        subscriptions.clear()

        mapFeatures.forEach { it.removeFromMap(this, RemovalReason.ON_DESTROY) }
        mapFeatures.clear()

        mapView = null

    }

    private fun initializeMap() {
        try {
            mapView = MapView(context).apply {
                layoutParams = LayoutParams(
                    LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT
                )
            }.also { mv ->
                addView(mv)
            }


        } catch (e: Exception) {
            Log.e(TAG, "Error initializing map", e)
        }
    }

    private fun setupMapListeners() {
       mapView.let { mapview ->
           val reactContext = context as ReactContext
           val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
           val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)


           mapView?.mapboxMap?.subscribeMapLoaded { st ->
               Log.d(TAG, "subscribeMapLoaded >>> ${st.timeInterval}")
               val payload = Arguments.createMap()
               val event = OnMapLoadedEvent(surfaceId, id, payload)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
           mapView?.mapboxMap?.subscribeMapLoadingError { error ->
               Log.d(TAG, "subscribeMapLoadingError >>> ${error}")
               val payload = Arguments.createMap().apply {
                   putString("type", error.type.name)
                   putString("message", error.message)
                   putString("sourceId", error.sourceId)
                   putString("tileId", error.tileId.toString())
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnMapLoadingErrorEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
           mapView?.mapboxMap?.subscribeMapIdle { it ->
               val position = mapView?.mapboxMap?.cameraState

               val payload = Arguments.createMap().apply {
                   putMap("coordinates", position?.center?.toReadableMap())
                   putDouble("zoom", position?.zoom ?: 0.0)
                   putDouble("bearing", position?.bearing ?: 0.0)
                   putDouble("pitch", position?.pitch ?: 0.0)
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnMapIdleEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }

           mapView?.mapboxMap?.subscribeStyleDataLoaded { st ->
               Log.d(TAG, "subscribeStyleDataLoaded >>> ${st.type}")
               val payload = Arguments.createMap().apply {
                   putString("type", st.type.name)
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnStyleDataLoadedEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
           mapView?.mapboxMap?.subscribeStyleLoaded { it ->
               Log.d(TAG, "subscribeStyleLoaded >>> ${it}")
               val payload = Arguments.createMap()
               val event = OnStyleLoadedEvent(surfaceId, id, payload)
               eventDispatcher?.dispatchEvent(event)

           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
           mapView?.mapboxMap?.subscribeStyleImageMissing { it ->
               Log.d(TAG, "subscribeStyleImageMissing >>> ${it}")
               val payload = Arguments.createMap().apply {
                   putString("imageId", it.imageId)
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnStyleImageMissingEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }

           mapView?.mapboxMap?.subscribeSourceAdded { it ->
               Log.d(TAG, "subscribeSourceAdded >>> ${it}")
               val payload = Arguments.createMap().apply {
                   putString("sourceId", it.sourceId)
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnSourceAddedEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }

           mapView?.mapboxMap?.subscribeRenderFrameFinished { it ->
               val payload = Arguments.createMap()
               val event = OnRenderFrameFinishedEvent(surfaceId, id, payload)
               eventDispatcher?.dispatchEvent(event)

           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
           mapView?.mapboxMap?.subscribeRenderFrameStarted { it ->
               val payload = Arguments.createMap()
               val event = OnRenderFrameStartedEvent(surfaceId, id, payload)
               eventDispatcher?.dispatchEvent(event)
           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }

           mapView?.mapboxMap?.subscribeSourceRemoved { it ->
               Log.d(TAG, "subscribeSourceRemoved >>> ${it}")
               val payload = Arguments.createMap().apply {
                   putString("sourceId", it.sourceId)
               }
               val properties = Arguments.createMap().apply {
                   putMap("properties", payload)
               }
               val event = OnSourceRemovedEvent(surfaceId, id, properties)
               eventDispatcher?.dispatchEvent(event)

           }?.let { cancelable ->
               subscriptions.add(cancelable)
           }
       }
    }

    private fun setupGestureListeners() {
        val reactContext = context as ReactContext
        val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
        val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)

        mapView?.gestures?.let { gestures ->
            OnMapClickListener { point ->
                val position = mapView?.mapboxMap?.cameraState

                val payload = Arguments.createMap().apply {
                    putMap("coordinates", point.toReadableMap())
                    putDouble("zoom", position?.zoom ?: 0.0)
                    putDouble("bearing", position?.bearing ?: 0.0)
                    putDouble("pitch", position?.pitch ?: 0.0)
                }

                val properties = Arguments.createMap().apply {
                    putMap("properties", payload)
                }
                val event = OnMapClickListenerEvent(surfaceId, id, properties)
                eventDispatcher?.dispatchEvent(event)
                true
            }.also {
                gestures.addOnMapClickListener(it)
                gestureListeners.add(it)
            }
            OnMapLongClickListener { point ->
                val position = mapView?.mapboxMap?.cameraState
                val payload = Arguments.createMap().apply {
                    putMap("coordinates", point.toReadableMap())
                    putDouble("zoom", position?.zoom ?: 0.0)
                    putDouble("bearing", position?.bearing ?: 0.0)
                    putDouble("pitch", position?.pitch ?: 0.0)
                }

                val properties = Arguments.createMap().apply {
                    putMap("properties", payload)
                }
                val event = OnMapLongClickListenerEvent(surfaceId, id, properties)
                eventDispatcher?.dispatchEvent(event)
                true
            }.also {
                gestures.addOnMapLongClickListener(it)
                gestureListeners.add(it)
            }
        }
    }
    private fun cleanupMapListeners() {
        subscriptions.forEach { it.cancel() }
        subscriptions.clear()
    }

    private fun cleanupGestureListeners() {
        mapView?.gestures?.let { gestures ->
            gestureListeners.forEach { listener ->
                when (listener) {
                    is OnMapClickListener -> gestures.removeOnMapClickListener(listener)
                    is OnMapLongClickListener -> gestures.removeOnMapLongClickListener(listener)
                }
            }
        }
        gestureListeners.clear()
    }

    fun setStyleURL(style: String) {
        mapView?.mapboxMap?.loadStyle(style) {st ->
            Log.d(TAG, "Map style loaded successfully with ${st.styleURI}")
        }
    }

    fun setShowScaleBar(value: Boolean) {
        mapView?.scalebar?.updateSettings {
            enabled = value
        }
    }

    fun setScaleBarOptions(block: ScaleBarSettings.Builder.() -> Unit) {
        mapView?.scalebar?.updateSettings(block)
    }

    fun setLogoOptions(block: (LogoSettings.Builder) -> Unit) {
        mapView?.logo?.updateSettings(block)
    }

    fun setAttributionOptions(block: (AttributionSettings.Builder) -> Unit) {
        mapView?.attribution?.updateSettings(block)

    }

    fun setCompassOptions(block: (CompassSettings.Builder) -> Unit) {
        mapView?.compass?.updateSettings(block)
    }

    fun setGestureOptions(block: (GesturesSettings.Builder) -> Unit) {
        mapView?.gestures?.updateSettings(block)
    }

    fun getZoom(): Double? {
        return mapView?.mapboxMap?.cameraState?.zoom
    }


}
