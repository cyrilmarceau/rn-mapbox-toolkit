package com.rnmapboxtoolkit

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.ViewGroup
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.mapbox.common.Cancelable
import com.mapbox.maps.MapView
import com.mapbox.maps.plugin.attribution.attribution
import com.mapbox.maps.plugin.attribution.generated.AttributionSettings
import com.mapbox.maps.plugin.compass.compass
import com.mapbox.maps.plugin.compass.generated.CompassSettings
import com.mapbox.maps.plugin.gestures.generated.GesturesSettings
import com.mapbox.maps.plugin.gestures.gestures
import com.mapbox.maps.plugin.logo.generated.LogoSettings
import com.mapbox.maps.plugin.logo.logo
import com.mapbox.maps.plugin.scalebar.generated.ScaleBarSettings
import com.mapbox.maps.plugin.scalebar.scalebar
import com.rnmapboxtoolkit.extensions.toReadableMap
import com.rnmaps.fabric.event.OnMapIdleEvent
import com.rnmaps.fabric.event.OnMapLoadedEvent
import com.rnmaps.fabric.event.OnMapLoadingErrorEvent
import com.rnmaps.fabric.event.OnRenderFrameFinishedEvent
import com.rnmaps.fabric.event.OnRenderFrameStartedEvent
import com.rnmaps.fabric.event.OnSourceAddedEvent
import com.rnmaps.fabric.event.OnSourceRemovedEvent
import com.rnmaps.fabric.event.OnStyleDataLoadedEvent
import com.rnmaps.fabric.event.OnStyleImageMissingEvent
import com.rnmaps.fabric.event.OnStyleLoadedEvent


class RnMapboxToolkitView : ViewGroup {

    companion object {
        const val TAG = "RnMapboxToolkitView"
    }

    private var mapView: MapView? = null
    private val subscriptions = mutableListOf<Cancelable>()

    init {
        Log.d(TAG, "Init")
        initializeMap()
        setupMapListeners()
    }


    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )
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
    }



    private fun initializeMap() {
        try {
            mapView = MapView(context).apply {
                layoutParams = LayoutParams(
                    LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT
                )
            }
            addView(mapView)

        } catch (e: Exception) {
            Log.e(TAG, "Error initializing map", e)
        }
    }

    private fun setupMapListeners() {
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
            Log.d(TAG, "subscribeRenderFrameFinished >>> ${it}")
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
            Log.d(TAG, "subscribeRenderFrameStarted >>> ${it}")
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

        // TODO: Add this list of listener (MapListenerDelegate)
        /**
         * https://docs.mapbox.com/android/maps/api/11.14.3/mapbox-maps-android/com.mapbox.maps.plugin.delegates/-map-listener-delegate/subscribe-camera-changed.html
         */


    }

    private fun cleanupMapListeners() {
        subscriptions.forEach { it.cancel() }
        subscriptions.clear()
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

}
