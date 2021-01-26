// @flow

import { NativeModules, Platform } from 'react-native';

import { MD_FONT_SIZE } from '../features/base/dialog/components/native/styles';
import { getFeatureFlag } from '../features/base/flags';
import { calcButtonSize } from '../features/toolbox/components/native/styles';

import icw from './constants';

// native modules
const { RNStaticSafeAreaInsets } = NativeModules;

/**
 * Toolbox height.
 *
 * @returns {number}
 */
export function getToolboxHeight() {
    return (icw.padding * 4) + calcButtonSize() + (icw.padding / 2) + MD_FONT_SIZE + getSafeAreaBottomInset();
}

/**
 * Safe area bottom inset.
 *
 * @returns {number}
 */
export function getSafeAreaBottomInset() {
    if (Platform.OS === 'ios') {
        return RNStaticSafeAreaInsets.safeAreaInsetsBottom;
    }

    return 0;
}

/**
 * Get if chat overlay is enabled.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {boolean}
 */
export function isChatOverlayEnabled(stateful: Function | Object) {
    return Boolean(getFeatureFlag(stateful, 'chat-overlay.enabled', false));
}

/**
 * Get message limit to display in chat overlay.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {number}
 */
export function getChatOverlayLimit(stateful: Function | Object) {
    return getFeatureFlag(stateful, 'chat-overlay.limit', 4);
}

/**
 * Get if tile view is enabled.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {boolean}
 */
export function isTileViewEnabled(stateful: Function | Object) {
    return Boolean(getFeatureFlag(stateful, 'tile-view.enabled', false));
}

