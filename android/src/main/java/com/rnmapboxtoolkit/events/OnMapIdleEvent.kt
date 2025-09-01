package com.rnmaps.fabric.event

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnMapIdleEvent(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<OnMapIdleEvent>(surfaceId, viewId) {

    companion object {
        const val EVENT_NAME = "onMapIdle"
    }

    override fun getEventName(): String {
        return EVENT_NAME
    }

    override fun getEventData(): WritableMap {
        return payload
    }
}
