/*
 * Copyright @ 2017-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import UIKit

public typealias AnimationCompletion = (Bool) -> Void

public protocol PiPViewCoordinatorDelegate: class {
    
    func exitPictureInPicture()
    
    func closePictureInPicture()
}

/// Coordinates the view state of a specified view to allow
/// to be presented in full screen or in a custom Picture in Picture mode.
/// This object will also provide the drag and tap interactions of the view
/// when is presented in Picure in Picture mode.
public class PiPViewCoordinator {

    /// Limits the boundries of view position on screen when minimized
    public var dragBoundInsets: UIEdgeInsets = UIEdgeInsets(top: 25,
                                                            left: 5,
                                                            bottom: 5,
                                                            right: 5) {
        didSet {
            dragController.insets = dragBoundInsets
            self.dragBoundInsetsChanged(oldValue: oldValue)
        }
    }

    public enum Position {
        case lowerRightCorner
        case upperRightCorner
        case lowerLeftCorner
        case upperLeftCorner
    }
    
    public var initialPositionInSuperview = Position.lowerRightCorner
    
    public var currentPictureInPicturePosition: Position? {
        guard isInPiP else {
            return nil
        }

        let bounds = self.currentBounds
        let oldAdjustedBounds = bounds.inset(by: self.dragBoundInsets)
        
        var oldAdjustedBoundsCenter = oldAdjustedBounds.origin
        oldAdjustedBoundsCenter.x += (oldAdjustedBounds.width / 2)
        oldAdjustedBoundsCenter.y += (oldAdjustedBounds.height / 2)
        
        var currentPosition: Position?
        if self.view.center.y < oldAdjustedBoundsCenter.y {
            //up
            if self.view.center.x < oldAdjustedBoundsCenter.x {
                currentPosition = .upperLeftCorner
            } else {
                currentPosition = .upperRightCorner
            }
        } else {
            //down
            if self.view.center.x < oldAdjustedBoundsCenter.x {
                currentPosition = .lowerLeftCorner
            } else {
                currentPosition = .lowerRightCorner
            }
        }
        
        return currentPosition
    }
    
    // Unused. Remove on the next major release.
    @available(*, deprecated, message: "The PiP window size is now fixed to 150px.")
    public var c: CGFloat = 0.0
    
    public weak var delegate: PiPViewCoordinatorDelegate?

    public private(set) var isInPiP: Bool = false // true if view is in PiP mode
    public private(set) var view: UIView
    
    private var currentBounds: CGRect = CGRect.zero
    private var tapGestureRecognizer: UITapGestureRecognizer?
    private var exitPiPButton: UIButton?
    private var closePiPButton: UIButton?

    private let dragController: DragGestureController = DragGestureController()

    public init(withView view: UIView) {
        self.view = view
    }

    /// Configure the view to be always on top of all the contents
    /// of the provided parent view.
    /// If a parentView is not provided it will try to use the main window
    public func configureAsStickyView(withParentView parentView: UIView? = nil) {
        guard
            let parentView = parentView ?? UIApplication.shared.keyWindow
            else { return }

        parentView.addSubview(view)
        currentBounds = parentView.bounds
        view.frame = currentBounds
        view.layer.zPosition = CGFloat(Float.greatestFiniteMagnitude)
    }

    /// Show view with fade in animation
    public func show(completion: AnimationCompletion? = nil) {
        if view.isHidden || view.alpha < 1 {
            view.isHidden = false
            view.alpha = 0

            animateTransition(animations: { [weak self] in
                self?.view.alpha = 1
            }, completion: completion)
        } else {
            completion?(true)
        }
    }

    /// Hide view with fade out animation
    public func hide(completion: AnimationCompletion? = nil) {
        if view.isHidden || view.alpha > 0 {
            animateTransition(animations: { [weak self] in
                self?.view.alpha = 0
                self?.view.isHidden = true
            }, completion: completion)
        } else {
            completion?(true)
        }
    }

    /// Resize view to and change state to custom PictureInPicture mode
    /// This will resize view, add a  gesture to enable user to "drag" view
    /// around screen, and add a button of top of the view to be able to exit mode
    public func enterPictureInPicture() {
        isInPiP = true
        animateViewChange()
        dragController.startDragListener(inView: view)
        dragController.insets = dragBoundInsets

        // add single tap gesture recognition for displaying exit PiP UI
        let exitSelector = #selector(toggleExitPiP)
        let tapGestureRecognizer = UITapGestureRecognizer(target: self,
                                                          action: exitSelector)
        self.tapGestureRecognizer = tapGestureRecognizer
        view.addGestureRecognizer(tapGestureRecognizer)
    }

    /// Exit Picture in picture mode, this will resize view, remove
    /// exit pip button, and disable the drag gesture
    @objc public func exitPictureInPicture() {
        isInPiP = false
        animateViewChange()
        dragController.stopDragListener()

        // hide PiP UI
        exitPiPButton?.removeFromSuperview()
        exitPiPButton = nil
        
        closePiPButton?.removeFromSuperview()
        closePiPButton = nil

        // remove gesture
        let exitSelector = #selector(toggleExitPiP)
        tapGestureRecognizer?.removeTarget(self, action: exitSelector)
        tapGestureRecognizer = nil
        
        delegate?.exitPictureInPicture()
    }
    
    @objc public func closePictureInPicture() {
        isInPiP = false
        dragController.stopDragListener()
        
        // hide PiP UI
        exitPiPButton?.removeFromSuperview()
        exitPiPButton = nil
        
        closePiPButton?.removeFromSuperview()
        closePiPButton = nil

        // remove gesture
        let exitSelector = #selector(toggleExitPiP)
        tapGestureRecognizer?.removeTarget(self, action: exitSelector)
        tapGestureRecognizer = nil
        
        delegate?.closePictureInPicture()
    }

    /// Reset view to provide bounds, use this method on rotation or
    /// screen size changes
    public func resetBounds(bounds: CGRect) {
        currentBounds = bounds
        exitPictureInPicture()
    }

    /// Stop the dragging gesture of the root view
    public func stopDragGesture() {
        dragController.stopDragListener()
    }
    
    /// Move picture in picture to position
    public func movePictureInPictureTo(position: Position) {
        guard isInPiP else {
            return
        }
        
        let bounds = currentBounds
        
        // resize to suggested ratio and position to the bottom right
        let adjustedBounds = bounds.inset(by: dragBoundInsets)
        let size = CGSize(width: 150, height: 150)
        let origin = initialPositionFor(pipSize: size, bounds: adjustedBounds, position: position)
        
        UIView.animate(withDuration: 0.25) {
            self.view.frame.origin = origin
        }
    }

    /// Customize the presentation of exit pip button
    open func configureExitPiPButton(target: Any,
                                     action: Selector) -> UIButton {
        let buttonImage = UIImage.init(named: "image-resize",
                                       in: Bundle(for: type(of: self)),
                                       compatibleWith: nil)
        let button = UIButton(type: .custom)
        let size: CGSize = CGSize(width: 44, height: 44)
        button.setImage(buttonImage, for: .normal)
        button.backgroundColor = .gray
        button.layer.cornerRadius = size.width / 2
        button.frame = CGRect(origin: CGPoint.zero, size: size)
        button.center = view.convert(view.center, from: view.superview)
        button.addTarget(target, action: action, for: .touchUpInside)
        return button
    }

    /// Customize the presentation of close pip button
    open func configureClosePiPButton(target: Any,
                                     action: Selector) -> UIButton {
        let buttonImage = UIImage.init(named: "close",
                                       in: Bundle(for: type(of: self)),
                                       compatibleWith: nil)
        let button = UIButton(type: .custom)
        let size: CGSize = CGSize(width: 44, height: 44)
        button.setImage(buttonImage, for: .normal)
        button.backgroundColor = .clear
        button.frame = CGRect(origin: CGPoint(x: view.frame.width - size.width, y: 0), size: size)
        button.contentEdgeInsets = UIEdgeInsets(top: 0, left: 15, bottom: 15, right: 0)
        button.addTarget(target, action: action, for: .touchUpInside)
        return button
    }
    
    // MARK: - Interactions

    @objc private func toggleExitPiP() {
        if exitPiPButton == nil {
            // show button
            let exitSelector = #selector(exitPictureInPicture)
            let button = configureExitPiPButton(target: self,
                                                action: exitSelector)
            view.addSubview(button)
            exitPiPButton = button
            
            let closeSelector = #selector(closePictureInPicture)
            let closeButton = configureClosePiPButton(target: self,
                                                action: closeSelector)
            view.addSubview(closeButton)
            closePiPButton = closeButton
        } else {
            // hide button
            exitPiPButton?.removeFromSuperview()
            exitPiPButton = nil
            
            closePiPButton?.removeFromSuperview()
            closePiPButton = nil
        }
    }

    // MARK: - Size calculation

    private func animateViewChange() {
        UIView.animate(withDuration: 0.25) {
            self.view.frame = self.changeViewRect()
            self.view.setNeedsLayout()
        }
    }

    private func changeViewRect() -> CGRect {
        let bounds = currentBounds

        guard isInPiP else {
            return bounds
        }

        // resize to suggested ratio and position to the bottom right
        let adjustedBounds = bounds.inset(by: dragBoundInsets)
        let size = CGSize(width: 150, height: 150)
        let origin = initialPositionFor(pipSize: size, bounds: adjustedBounds, position: initialPositionInSuperview)
        return CGRect(x: origin.x, y: origin.y, width: size.width, height: size.height)
    }
    
    private func initialPositionFor(pipSize size: CGSize, bounds: CGRect, position: Position) -> CGPoint {
        switch position {
        case .lowerLeftCorner:
            return CGPoint(x: bounds.minX, y: bounds.maxY - size.height)
        case .lowerRightCorner:
            return CGPoint(x: bounds.maxX - size.width, y: bounds.maxY - size.height)
        case .upperLeftCorner:
            return CGPoint(x: bounds.minX, y: bounds.minY)
        case .upperRightCorner:
            return CGPoint(x: bounds.maxX - size.width, y: bounds.minY)
        }
    }
    
    private func dragBoundInsetsChanged(oldValue: UIEdgeInsets) {
        guard isInPiP else {
            return
        }

        let bounds = currentBounds
        
        let oldAdjustedBounds = bounds.inset(by: oldValue)
        
        var oldAdjustedBoundsCenter = oldAdjustedBounds.origin
        oldAdjustedBoundsCenter.x += (oldAdjustedBounds.width / 2)
        oldAdjustedBoundsCenter.y += (oldAdjustedBounds.height / 2)
        
        var currentPosition = self.initialPositionInSuperview
        if self.view.center.y < oldAdjustedBoundsCenter.y {
            //up
            if self.view.center.x < oldAdjustedBoundsCenter.x {
                currentPosition = .upperLeftCorner
            } else {
                currentPosition = .upperRightCorner
            }
        } else {
            //down
            if self.view.center.x < oldAdjustedBoundsCenter.x {
                currentPosition = .lowerLeftCorner
            } else {
                currentPosition = .lowerRightCorner
            }
        }
        
        let adjustedBounds = bounds.inset(by: dragBoundInsets)
        let size = CGSize(width: 150, height: 150)
        
        guard adjustedBounds.height >= size.height, adjustedBounds.width >= size.width else {
            return
        }
        
        let origin = initialPositionFor(pipSize: size, bounds: adjustedBounds, position: currentPosition)
        
        UIView.animate(withDuration: 0.25) {
            self.view.frame.origin = origin
        }
    }

    // MARK: - Animation helpers

    private func animateTransition(animations: @escaping () -> Void,
                                   completion: AnimationCompletion?) {
        UIView.animate(withDuration: 0.1,
                       delay: 0,
                       options: .beginFromCurrentState,
                       animations: animations,
                       completion: completion)
    }

}
