/* @flow */

import Tooltip from '@atlaskit/tooltip';
import React from 'react';

import { Icon } from '../../../base/icons';
import AbstractToolbarButton from '../AbstractToolbarButton';
import type { Props as AbstractToolbarButtonProps }
    from '../AbstractToolbarButton';

/**
 * The type of the React {@code Component} props of {@link ToolbarButton}.
 */
type Props = AbstractToolbarButtonProps & {

    /**
     * The text to display in the tooltip.
     */
    tooltip?: string,

    /**
     * From which direction the tooltip should appear, relative to the
     * button.
     */
    tooltipPosition: string
};

/**
 * Represents a button in the toolbar.
 *
 * @extends AbstractToolbarButton
 */
class ToolbarButton extends AbstractToolbarButton<Props> {
    /**
     * Default values for {@code ToolbarButton} component's properties.
     *
     * @static
     */
    static defaultProps = {
        tooltipPosition: 'top'
    };

    /**
     * Initializes a new {@code ToolbarButton} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    _onKeyDown: (Object) => void;

    /**
     * Handles 'Enter' key on the button to trigger onClick for accessibility.
     * We should be handling Space onKeyUp but it conflicts with PTT.
     *
     * @param {Object} event - The key event.
     * @private
     * @returns {void}
     */
    _onKeyDown(event) {
        // If the event coming to the dialog has been subject to preventDefault
        // we don't handle it here.
        if (event.defaultPrevented) {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.props.onClick();
        }
    }

    /**
     * Renders the button of this {@code ToolbarButton}.
     *
     * @param {Object} children - The children, if any, to be rendered inside
     * the button. Presumably, contains the icon of this {@code ToolbarButton}.
     * @protected
     * @returns {ReactElement} The button of this {@code ToolbarButton}.
     */
    _renderButton(children) {
        const { accessibilityLabel, className, label, onClick, toggled, tooltip, tooltipPosition } = this.props;

        return (
            <div
                aria-label = { accessibilityLabel }
                aria-pressed = { toggled }
                className = { `toolbox-button ${className || ''}` }
                onClick = { onClick }
                onKeyDown = { this._onKeyDown }
                role = 'button'
                tabIndex = { 0 }>
                { tooltip
                    ? <Tooltip
                        content = { tooltip }
                        position = { tooltipPosition }>
                        { children }
                    </Tooltip>
                    : children }
                {label ? <span className = 'toolbox-label'>{label}</span> : null}
            </div>
        );
    }

    /**
     * Renders the icon of this {@code ToolbarButton}.
     *
     * @inheritdoc
     */
    _renderIcon() {
        const { icon, toggled } = this.props;

        return (
            <div className = { `toolbox-icon ${toggled ? 'toggled' : ''}` }>
                {icon && <Icon src = { icon } />}
            </div>
        );

    }
}

export default ToolbarButton;
