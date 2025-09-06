package com.rnmaps.fabric.event

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnMapLongClickListenerEvent(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<OnMapLongClickListenerEvent>(surfaceId, viewId) {

    companion object {
        const val EVENT_NAME = "onMapLongClick"
    }

    override fun getEventName(): String {
        return EVENT_NAME
    }

    override fun getEventData(): WritableMap {
        return payload
    }
}
