package com.rnmapboxtoolkit.extensions

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.rnmapboxtoolkit.fabric.RnMapboxToolkitImages

fun ReadableArray.toMapboxImages(): List<RnMapboxToolkitImages.MapboxImage> {
    val images = mutableListOf<RnMapboxToolkitImages.MapboxImage>()

    for (i in 0 until this.size()) {
        val imageMap = this.getMap(i)
        imageMap?.let {
            images.add(it.toMapboxImage())
        }
    }

    return images
}

fun ReadableMap.toMapboxImage(): RnMapboxToolkitImages.MapboxImage {
    val name = this.getString("name") ?: ""
    val uri = this.getString("uri") ?: ""
    val sdf = if (this.hasKey("sdf")) this.getBoolean("sdf") else false

    return RnMapboxToolkitImages.MapboxImage(
        name = name,
        uri = uri,
        sdf = sdf
    )
}
