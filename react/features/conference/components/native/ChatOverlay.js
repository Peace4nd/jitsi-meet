// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import icw from '../../../../custom/constants';
import { getToolboxHeight, isChatOverlayEnabled } from '../../../../custom/utils';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import MessageContainer from '../../../chat/components/native/MessageContainer';
import { MESSAGE_TYPE_LOCAL } from '../../../chat/constants';
import { isToolboxVisible } from '../../../toolbox/functions';

/**
 * Custom styles
 */
const styles = StyleSheet.create({
    wrapper: {
        bottom: 0,
        position: 'absolute',
        padding: icw.padding * 2,
        width: '100%'
    },
    wrapperOffset: {
        marginBottom: getToolboxHeight()
    }
});

/**
 * Props type of the component.
 */
type Props = {
    onPress: Function,
    _enabled: boolean,
    _messages: Array<{
            displayName: string,
            error: mixed,
            id: string,
            message: string,
            messageType: string,
            privateMessage: boolean,
            recipient: string,
            timestamp: number
        }>,
    _visible: boolean
};

/**
 * Implements the UI elements to be displayed in the lonely meeting experience.
 */
class ChatOverlay extends PureComponent<Props> {
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        // rozlozeni
        const { onPress, _enabled, _messages, _visible } = this.props;

        // definice promennych
        const onlyRemote = _messages.filter(message => message.messageType !== MESSAGE_TYPE_LOCAL);

        // zobrazovat pouze pokud je prekryti povolene nevo pokud existuje nejake sdeleni
        if (!_enabled || onlyRemote.length === 0) {
            return null;
        }

        /* {
            "displayName": "Kundel",
            "error": undefined,
            "id": "d51fe916",
            "message": "kundaaaa",
            "messageType": "local",
            "privateMessage": false,
            "recipient": "Kundel",
            "timestamp": 1610715197750
        }*/


        // sestaveni a vraceni
        return (
            <TouchableWithoutFeedback onPress = { onPress }>
                <View style = { [ styles.wrapper, _visible ? styles.wrapperOffset : null ] }>
                    <MessageContainer messages = { onlyRemote } />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/**
 * Maps parts of the Redux state to the props of this Component.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): $Shape<Props> {
    return {
        _enabled: isChatOverlayEnabled(state),
        _messages: state['features/chat'].messages,
        _visible: isToolboxVisible(state)
    };
}

export default connect(_mapStateToProps)(translate(ChatOverlay));
