// @flow

import { getFeatureFlag } from '../features/base/flags';

/**
 * Get if chat overlay is enabled.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {boolean}
 */
export function isChatOverlayEnabled(stateful: Function | Object) {
    return Boolean(getFeatureFlag(stateful, 'chat-overlay.enabled', true));
}

/**
 * Get message limit to display in chat overlay.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {number}
 */
export function getChatOverlayLimit(stateful: Function | Object) {
    return getFeatureFlag(stateful, 'chat-overlay.limit', 0);
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

/**
 * Get if private messaging is enabled.
 *
 * @param {Function | Object} stateful - Redux state.
 * @returns {boolean}
 */
export function isPrivateMessageEnabled(stateful: Function | Object) {
    return Boolean(getFeatureFlag(stateful, 'private-message.enabled', false));
}
