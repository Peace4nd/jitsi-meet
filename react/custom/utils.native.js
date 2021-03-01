// @flow

import { NativeModules, Platform, Dimensions } from 'react-native';

import { MD_FONT_SIZE } from '../features/base/dialog/components/native/styles';
import { calcButtonSize } from '../features/toolbox/components/native/styles';

import icw from './constants';

// native modules
const { RNStaticSafeAreaInsets } = NativeModules;

/**
 * Toolbox height.
 *
 * @param {Function} cb - Callback.
 * @returns {void}
 */
export function getToolboxHeight(cb: Function) {
    getSafeAreaBottomInset(insets => {
        cb((icw.padding * 4) + calcButtonSize() + (icw.padding / 2) + MD_FONT_SIZE + insets.bottom);
    });
}

/**
 * Safe area bottom inset.
 *
 * @param {Function} cb - Callback.
 * @returns {void}
 */
export function getSafeAreaBottomInset(cb: Function) {
    if (Platform.OS === 'ios') {
        // pocatecni nastaveni
        RNStaticSafeAreaInsets.getSafeAreaInsets(values => {
            cb({
                top: values.safeAreaInsetsTop,
                bottom: values.safeAreaInsetsBottom,
                left: values.safeAreaInsetsLeft,
                right: values.safeAreaInsetsRight
            });
        });

        // zmena modu zobrazeni
        Dimensions.addEventListener('change', () => {
            RNStaticSafeAreaInsets.getSafeAreaInsets(values => {
                cb({
                    top: values.safeAreaInsetsTop,
                    bottom: values.safeAreaInsetsBottom,
                    left: values.safeAreaInsetsLeft,
                    right: values.safeAreaInsetsRight
                });
            });
        });
    } else {
        cb({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
    }
}
