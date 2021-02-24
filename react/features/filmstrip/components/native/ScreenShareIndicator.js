// @flow

import React from 'react';

import { IconShareDesktop } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';

import styles from './styles';

/**
 * Thumbnail badge for displaying if a participant is sharing their screen.
 *
 * @returns {React$Element<any>}
 */
export default function ScreenShareIndicator() {
    return (
        <BaseIndicator
            highlight = { false }
            icon = { IconShareDesktop }
            style = { styles.thumbnailIndicatorIcon } />
    );
}
