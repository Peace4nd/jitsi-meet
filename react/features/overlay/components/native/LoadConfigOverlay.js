// @flow

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import IcewarpLoading from '../../../../custom/loading';
import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { translate } from '../../../base/i18n';
import { TintedView } from '../../../base/react';
import { connect } from '../../../base/redux';
import { StyleType, ColorPalette } from '../../../base/styles';

import OverlayFrame from './OverlayFrame';
import styles from './styles';

const customStyles = StyleSheet.create({
    loading: {
        marginBottom: 10
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

type Props = {

    /**
     * The color schemed style of the component.
     */
    _styles: StyleType,

    /**
     * The Function to be invoked to translate i18n keys.
     */
    t: Function
};

/**
 * Implements an overlay to tell the user that there is an operation in progress in the background during connect
 * so then the app doesn't seem hung.
 */
class LoadConfigOverlay extends Component<Props> {
    /**
     * Determines whether this overlay needs to be rendered (according to a
     * specific redux state). Called by {@link OverlayContainer}.
     *
     * @param {Object} state - The redux state.
     * @returns {boolean} - If this overlay needs to be rendered, {@code true};
     * {@code false}, otherwise.
     */
    static needsRender(state: Object) {
        return Boolean(state['features/overlay'].loadConfigOverlayVisible);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _styles } = this.props;

        return (
            <OverlayFrame backgroundColor = { ColorPalette.appBackground }>
                <TintedView style = { styles.loadingOverlayWrapper }>
                    <SafeAreaView style = { customStyles.wrapper }>
                        <IcewarpLoading style = { customStyles.loading } />
                        <Text
                            style = { [
                                styles.loadingOverlayText,
                                _styles.loadingOverlayText
                            ] }>
                            { this.props.t('connectingOverlay.joiningRoom') }
                        </Text>
                    </SafeAreaView>
                </TintedView>
            </OverlayFrame>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _styles: StyleType
 * }}
 */
function _mapStateToProps(state) {
    return {
        _styles: ColorSchemeRegistry.get(state, 'LoadConfigOverlay')
    };
}

export default translate(connect(_mapStateToProps)(LoadConfigOverlay));
