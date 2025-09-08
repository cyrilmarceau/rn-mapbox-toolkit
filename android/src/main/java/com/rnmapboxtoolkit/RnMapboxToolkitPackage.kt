package com.rnmapboxtoolkit

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitViewManager
import com.rnmapboxtoolkit.modules.NativeMapViewModule
import java.util.ArrayList

class RnMapboxToolkitViewPackage : ReactPackage {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
    viewManagers.add(RnMapboxToolkitViewManager())
    return viewManagers
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
      val modulesManager: MutableList<NativeModule> = ArrayList()
      modulesManager.add(NativeMapViewModule(reactContext))
      return modulesManager
  }
}
