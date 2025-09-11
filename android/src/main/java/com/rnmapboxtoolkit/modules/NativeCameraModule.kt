package com.rnmapboxtoolkit.modules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.rnmapboxtoolkit.NativeCameraModuleSpec

@ReactModule(name = NativeCameraModule.NAME)
class NativeCameraModule(private val reactContext: ReactApplicationContext): NativeCameraModuleSpec(reactContext) {
    override fun getName(): String = "NativeCameraModule"
    override fun getZoomLevel(viewTag: Double, promise: Promise?) {

    }

    companion object {
        const val NAME = "NativeCameraModule"
    }




}
