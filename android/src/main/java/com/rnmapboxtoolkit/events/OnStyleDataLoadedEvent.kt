package com.rnmaps.fabric.event

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnStyleDataLoadedEvent(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<OnStyleDataLoadedEvent>(surfaceId, viewId) {

    companion object {
        const val EVENT_NAME = "onStyleDataLoaded"
    }

    override fun getEventName(): String {
        return EVENT_NAME
    }

    override fun getEventData(): WritableMap {
        return payload
    }

    /**
     * Disabled canCoalesce or we only received latest event based on timestamp
     * We received 3 events between 12 - 18ms
     */
    override fun canCoalesce(): Boolean {
        return false
    }
}
