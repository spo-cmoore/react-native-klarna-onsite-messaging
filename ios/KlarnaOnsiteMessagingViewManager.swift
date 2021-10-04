@objc(KlarnaOnsiteMessagingViewManager)
class KlarnaOnsiteMessagingViewManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> KlarnaOnsiteMessagingView {
        return KlarnaOnsiteMessagingView()
    }
}
