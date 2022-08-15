package com.reactnativeklarnaonsitemessaging

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.klarna.mobile.sdk.api.osm.KlarnaOSMEnvironment
import com.klarna.mobile.sdk.api.osm.KlarnaOSMRegion

class KlarnaOnsiteMessagingViewManager : ViewGroupManager<KlarnaOnsiteMessagingLayout>() {

  @ReactProp(name = "clientId")
  fun setClientId(view: KlarnaOnsiteMessagingLayout, clientId: String) {
    with(view) {
      this.osmView.clientId = clientId
    }
  }

  @ReactProp(name = "placementKey")
  fun setPlacementKey(view: KlarnaOnsiteMessagingLayout, placementKey: String) {
    with(view) {
      this.osmView.placementKey = placementKey
    }
  }

  @ReactProp(name = "locale")
  fun setLocale(view: KlarnaOnsiteMessagingLayout, locale: String) {
    with(view) {
      this.osmView.locale = locale
    }
  }

  @ReactProp(name = "environment")
  fun setEnvironment(view: KlarnaOnsiteMessagingLayout, environment: Int) {
    with(view) {
      this.osmView.environment = KlarnaOSMEnvironment::class.fromRawValue(environment)
    }
  }

  @ReactProp(name = "region")
  fun setRegion(view: KlarnaOnsiteMessagingLayout, region: Int) {
    with(view) {
      this.osmView.region = KlarnaOSMRegion::class.fromRawValue(region)
    }
  }

  @ReactProp(name = "purchaseAmount")
  fun setPurchaseAmount(view: KlarnaOnsiteMessagingLayout, purchaseAmount: Int?) {
    with(view) {
      this.osmView.purchaseAmount = purchaseAmount?.toLong()
    }
  }

  override fun onAfterUpdateTransaction(view: KlarnaOnsiteMessagingLayout) {
    super.onAfterUpdateTransaction(view)
    view.setupOSMView()
  }

  override fun getName() = "KlarnaOnsiteMessagingView"

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return mutableMapOf(
      "onOSMViewError" to mutableMapOf("registrationName" to "onOSMViewError"),
      "onHeightChange" to mutableMapOf("registrationName" to "onHeightChange")
    )
  }

  override fun createViewInstance(reactContext: ThemedReactContext): KlarnaOnsiteMessagingLayout {
    return KlarnaOnsiteMessagingLayout(reactContext, KlarnaOnsiteMessagingEventEmitter(reactContext))
  }
}
