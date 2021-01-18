// @flow

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
    return (icw.padding * 4) + BUTTON_SIZE + icw.border.width + (icw.padding / 2) + MD_FONT_SIZE;
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
