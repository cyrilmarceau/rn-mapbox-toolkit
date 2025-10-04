package com.rnmapboxtoolkit.fabric

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitTerrainManagerDelegate
import com.facebook.react.viewmanagers.RnMapboxToolkitTerrainManagerInterface

@ReactModule(name = RnMapboxToolkitTerrainManager.NAME)
class RnMapboxToolkitTerrainManager :
    SimpleViewManager<RnMapboxToolkitTerrain>(),
    RnMapboxToolkitTerrainManagerInterface<RnMapboxToolkitTerrain> {

    override fun getName(): String {
        return NAME
    }

    private val mDelegate: ViewManagerDelegate<RnMapboxToolkitTerrain> =
        RnMapboxToolkitTerrainManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<RnMapboxToolkitTerrain>? {
        return mDelegate
    }

    public override fun createViewInstance(context: ThemedReactContext): RnMapboxToolkitTerrain {
        return RnMapboxToolkitTerrain(context)
    }

    override fun setSourceID(
        view: RnMapboxToolkitTerrain?,
        value: String?
    ) {
        view?.setSourceID(value)
    }

    override fun setExaggeration(
        view: RnMapboxToolkitTerrain?,
        value: Double
    ) {
        view?.setExaggeration(value)
    }

    companion object {
        const val NAME = "RnMapboxToolkitTerrain"
    }
}
