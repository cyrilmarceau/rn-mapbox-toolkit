package com.rnmapboxtoolkit

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitBackgroundLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitCameraManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitCircleLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitFillExtrusionLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitFillLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitLineLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitShapeSourceManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitSkyLayerManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitViewManager
import com.rnmapboxtoolkit.modules.NativeCameraModule
import com.rnmapboxtoolkit.modules.NativeMapViewModule
import com.rnmapboxtoolkit.modules.NativeShapeSourceModule

class RnMapboxToolkitViewPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            RnMapboxToolkitViewManager(),
            RnMapboxToolkitCameraManager(),
            RnMapboxToolkitShapeSourceManager(),
            RnMapboxToolkitCircleLayerManager(),
            RnMapboxToolkitLineLayerManager(),
            RnMapboxToolkitFillLayerManager(),
            RnMapboxToolkitSkyLayerManager(),
            RnMapboxToolkitBackgroundLayerManager(),
            RnMapboxToolkitFillExtrusionLayerManager()
        )
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            NativeMapViewModule(reactContext),
            NativeCameraModule(reactContext),
            NativeShapeSourceModule(reactContext)
        )
    }
}
