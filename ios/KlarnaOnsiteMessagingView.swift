//
//  KlarnaOnsiteMessagingView.swift
//  react-native-klarna-onsite-messaging
//
//  Created by Vadzim Filipovich on 10/4/21.
//

import Foundation
import KlarnaMobileSDK

class KlarnaOnsiteMessagingView : UIView {
    private var osmView: KlarnaOSMView

    // It couldnt be changed on the fly, but if u will change it - it will force re-render
    @objc var clientId: String = "" {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var placementKey: String = "" {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var locale: String = "" {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var environment: Int = 0 {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var region: Int = 0 {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var purchaseAmount: NSInteger = NSInteger() {
        didSet {
            setNeedsDisplay()
        }
    }

    @objc var onHeightChange: RCTBubblingEventBlock?

    @objc var onOSMViewError: RCTBubblingEventBlock?

    init() {
        self.osmView = KlarnaOSMView()

        super.init(frame: .zero)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func draw(_ rect: CGRect) {
        self.osmView.frame = rect

        let amount = Int(purchaseAmount)

        osmView.clientId = clientId
        osmView.placementKey = placementKey
        osmView.locale = locale

        // osmView.environment = KlarnaOSMEnvironment(rawValue: environment) ?? .demo
        // osmView.region = KlarnaOSMRegion(rawValue: region) ?? .eu

        osmView.environment = .production
        osmView.region = .na

        osmView.purchaseAmount = amount != 0 ? amount : nil

        osmView.hostViewController = self.reactViewController()
        osmView.sizingDelegate = self

        osmView.render(callback: self.handleOSMViewError)

        self.addSubview(osmView)
    }

    func handleOSMViewError(error: KlarnaError?) {
        if let onOSMViewError = onOSMViewError, let error = error {
            onOSMViewError([
                "message": error.message,
                "name": error.name,
                "isFatal": error.isFatal
            ])
        }
    }
}

extension KlarnaOnsiteMessagingView: KlarnaSizingDelegate {
    func klarnaComponent(_ klarnaComponent: KlarnaComponent, resizedToHeight height: CGFloat) {
        if let onHeightChange = onHeightChange {
            if height == 0 {
                return
            }


            if self.frame.height != height {
                self.frame = CGRect(x: 0, y: 0, width: self.frame.width, height: height)
                setNeedsDisplay()

                onHeightChange([
                    "height": height
                ])
            }
        }
    }
}
