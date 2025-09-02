package com.rnmaps.fabric.event

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnRenderFrameStarted(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<OnRenderFrameStarted>(surfaceId, viewId) {

    companion object {
        const val EVENT_NAME = "onRenderFrameStarted"
    }

    override fun getEventName(): String {
        return EVENT_NAME
    }

    override fun getEventData(): WritableMap {
        return payload
    }
}
