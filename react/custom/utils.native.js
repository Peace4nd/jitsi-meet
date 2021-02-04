// @flow

import { NativeModules, Platform } from 'react-native';

import { MD_FONT_SIZE } from '../features/base/dialog/components/native/styles';
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
