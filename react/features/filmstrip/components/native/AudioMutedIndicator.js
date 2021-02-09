// @flow

import React, { Component } from 'react';

import { IconIcewarpToolbarMuteOff } from '../../../../custom/icons';
import { BaseIndicator } from '../../../base/react';

/**
 * Thumbnail badge for displaying the audio mute status of a participant.
 */
export default class AudioMutedIndicator extends Component<{}> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <BaseIndicator
                highlight = { false }
                icon = { IconIcewarpToolbarMuteOff } />
        );
    }
}
