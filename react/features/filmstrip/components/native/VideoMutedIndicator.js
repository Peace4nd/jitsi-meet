// @flow

import React, { Component } from 'react';

import { IconIcewarpToolbarCamOff } from '../../../../custom/icons';
import { BaseIndicator } from '../../../base/react';

import styles from './styles';

/**
 * Thumbnail badge for displaying the video mute status of a participant.
 */
export default class VideoMutedIndicator extends Component<{}> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <BaseIndicator
                highlight = { false }
                icon = { IconIcewarpToolbarCamOff }
                style = { styles.thumbnailIndicatorIcon } />
        );
    }
}
