// @flow

import React, { Component } from 'react';

import { Icon } from '../../icons';

type Props = {

    /**
     * The decorated component (ToolboxButton).
     */
    children: React$Node,

    /**
     * Icon of the button.
     */
    icon: Function,

    /**
     * Flag used for disabling the small icon.
     */
    iconDisabled: boolean,

    /**
     * Click handler for the small icon.
     */
    onIconClick: Function,

    /**
     * Additional styles.
     */
    styles?: Object,
};

/**
 * Displayes the `ToolboxButtonWithIcon` component.
 *
 * @returns {ReactElement}
 */
export default class ToolboxButtonWithIcon extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Node}
     */
    render() {
        const {
            children,
            icon,
            iconDisabled,
            onIconClick,
            styles
        } = this.props;

        return (
            <div
                className = 'settings-button-container'
                styles = { styles }>
                {children}
                <div>
                    <Icon
                        className = { `settings-button-small-icon${iconDisabled ? ' disabled' : ''}` }
                        onClick = { onIconClick }
                        src = { icon } />
                </div>
            </div>
        );
    }
}
