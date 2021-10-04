package com.reactnativeklarnaonsitemessaging

import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.klarna.mobile.sdk.api.KlarnaLoggingLevel
import com.klarna.mobile.sdk.api.KlarnaMobileSDKCommon
import com.klarna.mobile.sdk.api.osm.KlarnaOSMEnvironment
import com.klarna.mobile.sdk.api.osm.KlarnaOSMRegion
import com.klarna.mobile.sdk.api.osm.KlarnaOSMTheme
import com.klarna.mobile.sdk.api.osm.KlarnaOSMView

class KlarnaOnsiteMessagingViewManager : SimpleViewManager<KlarnaOSMView>() {
  override fun getName() = "KlarnaOnsiteMessagingView"

  override fun createViewInstance(reactContext: ThemedReactContext): KlarnaOSMView {
    KlarnaMobileSDKCommon.setLoggingLevel(KlarnaLoggingLevel.Verbose)

    val osmView = KlarnaOSMView(reactContext)

    osmView.clientId = "BruhMehTest"
    osmView.placementKey = "Key"
    osmView.locale = "locale"
    osmView.environment = KlarnaOSMEnvironment.DEMO
    osmView.region = KlarnaOSMRegion.EU
    osmView.theme = KlarnaOSMTheme.AUTOMATIC
    osmView.hostActivity = reactContext.currentActivity

    return osmView
  }

  @ReactProp(name = "color")
  fun setColor(view: View, color: String) {
    view.setBackgroundColor(Color.parseColor(color))
  }
}
