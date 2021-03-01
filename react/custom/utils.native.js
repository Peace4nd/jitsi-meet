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
    getSafeAreaBottomInset(inset => {
        cb((icw.padding * 4) + calcButtonSize() + (icw.padding / 2) + MD_FONT_SIZE + inset);
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
        Dimensions.addEventListener('change', () => {
            RNStaticSafeAreaInsets.getSafeAreaInsets(values => {
                cb(values.safeAreaInsetsBottom);
            });
        });
    } else {
        cb(0);
    }
}
