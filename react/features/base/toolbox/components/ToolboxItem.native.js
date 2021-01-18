// @flow

import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import icw from '../../../../custom/constants';
import { Icon } from '../../icons';

import type { Props } from './AbstractToolboxItem';
import AbstractToolboxItem from './AbstractToolboxItem';

/**
 * Native implementation of {@code AbstractToolboxItem}.
 */
export default class ToolboxItem extends AbstractToolboxItem<Props> {
    /**
     * Renders the {@code Icon} part of this {@code ToolboxItem}.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderIcon() {
        const { styles } = this.props;

        return (
            <Icon
                src = { this.props.icon }
                style = { styles && styles.iconStyle } />
        );
    }

    /**
     * Renders this {@code ToolboxItem}. Invoked by {@link AbstractToolboxItem}.
     *
     * @override
     * @protected
     * @returns {ReactElement}
     */
    _renderItem() {
        const {
            disabled,
            elementAfter,
            labelBottom,
            onClick,
            showLabel,
            styles,
            toggled
        } = this.props;

        let children = this._renderIcon();

        // XXX When using a wrapper View, apply the style to it instead of
        // applying it to the TouchableHighlight.
        let style = styles ? styles.style || {} : undefined;
        const labelStyle = styles ? styles.labelStyle || {} : {};

        if (showLabel) {
            // XXX TouchableHighlight requires 1 child. If there's a need to
            // show both the icon and the label, then these two need to be
            // wrapped in a View.
            children = (
                <>
                    <View style = { style }>
                        { children }
                        {!labelBottom && (<Text style = { labelStyle }>
                            { this.label }
                        </Text>)}
                        { elementAfter }
                    </View>
                    {labelBottom && (<Text
                        style = { [ labelStyle, { marginTop: icw.padding / 2 } ] }>
                        { this.label }
                    </Text>)}
                </>
            );

            // XXX As stated earlier, the style was applied to the wrapper View
            // (above).
            if (labelBottom) {
                style = {
                    alignItems: 'center',
                    justifyContent: 'center'
                };
            } else {
                style = undefined;
            }
        }

        return (
            <TouchableHighlight
                accessibilityLabel = { this.accessibilityLabel }
                accessibilityRole = 'button'
                accessibilityState = {{ 'selected': toggled }}
                disabled = { disabled }
                onPress = { onClick }
                style = { style }
                underlayColor = { styles ? styles.underlayColor || 'transparent' : 'transparent' } >
                { children }
            </TouchableHighlight>
        );
    }
}
