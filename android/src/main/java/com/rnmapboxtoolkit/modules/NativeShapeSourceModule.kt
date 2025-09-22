package com.rnmapboxtoolkit.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.rnmapboxtoolkit.NativeShapeSourceModuleSpec

@ReactModule(name = NativeShapeSourceModule.NAME)
class NativeShapeSourceModule(private val reactContext: ReactApplicationContext): NativeShapeSourceModuleSpec(reactContext) {
    override fun getName(): String = "NativeShapeSourceModule"

    companion object {
        const val NAME = "NativeShapeSourceModule"
    }
}
