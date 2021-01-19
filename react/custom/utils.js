// @flow

import { Platform } from 'react-native';

import { MD_FONT_SIZE } from '../features/base/dialog/components/native/styles';
import { CHAT_OVERLAY_ENABLED, getFeatureFlag } from '../features/base/flags';
import { BUTTON_SIZE } from '../features/toolbox/components/native/styles';

import icw from './constants';

/**
 * Toolbox height.
 *
 * @returns {number}
 */
export function getToolboxHeight() {
    // definice
    const height = (icw.padding * 4) + BUTTON_SIZE + (icw.padding / 2) + MD_FONT_SIZE;

    // ios je mrdka
    if (Platform.OS === 'ios') {
        if (Platform.isPad) {
            return height + 20;
        }

        return height + 34;
    }

    // android
    return height;
}

/**
 * Safe area bottom inset. //Not good nieje na to nejaké knižnica?
 *
 * @returns {number}
 */
export function getSafeAreaBottomInset() {
    if (Platform.OS === 'ios') {
        if (Platform.isPad) {
            return 20;
        }

        return 34;
    }

    // android
    return 0;
}

/**
 * Get if chat overlay is enabled.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {boolean}
 */
export function isChatOverlayEnabled(stateful: Function | Object) {
    return Boolean(getFeatureFlag(stateful, CHAT_OVERLAY_ENABLED, false));
}
