package com.rnmaps.fabric.event

import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnRenderFrameFinished(
    surfaceId: Int,
    viewId: Int,
    private val payload: WritableMap
) : Event<OnRenderFrameFinished>(surfaceId, viewId) {

    companion object {
        const val EVENT_NAME = "onRenderFrameFinished"
    }

    override fun getEventName(): String {
        return EVENT_NAME
    }

    override fun getEventData(): WritableMap {
        return payload
    }
}
