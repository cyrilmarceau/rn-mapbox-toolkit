package com.rnmapboxtoolkit.fabric
import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext

@SuppressLint("ViewConstructor")
class RnMapboxToolkitCamera(context: ThemedReactContext) : AbstractMapFeature(context) {

    companion object {
        const val TAG = "RnMapboxToolkitCamera"
    }

    override fun addToMap(mapView: RnMapboxToolkitView) {
        super.addToMap(mapView)

    }

    override fun removeFromMap(
        mapView: RnMapboxToolkitView,
        reason: RemovalReason
    ): Boolean {
        return super.removeFromMap(mapView, reason)
    }


    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
    }
}
