// @flow

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import icw from '../../../../custom/constants';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { MESSAGE_TYPE_LOCAL } from '../../../chat/constants';

/**
 * Custom styles
 */
const styles = StyleSheet.create({
    wrapper: {
        bottom: 0,
        position: 'absolute',
        padding: icw.padding * 2
    }
});

/**
 * Props type of the component.
 */
type Props = {
    _messages: Array<{
            displayName: string,
            error: mixed,
            id: string,
            message: string,
            messageType: string, // local
            privateMessage: boolean,
            recipient: string,
            timestamp: number
        }>
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
        const { _messages } = this.props;

        // vyfiltrovani lokalnich
        // const onlyRemote = _messages.filter(message => message.messageType !== MESSAGE_TYPE_LOCAL);
        const onlyRemote = _messages;

        // zobrazovat pouze pokud existuje nejake sdeleni
        if (onlyRemote.length === 0) {
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
            <View
                pointerEvents = 'none'
                style = { styles.wrapper }>
                <Text>
                    {JSON.stringify(onlyRemote)}
                </Text>
            </View>
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
    const { messages } = state['features/chat'];

    return {
        _messages: messages
    };
}

export default connect(_mapStateToProps)(translate(ChatOverlay));
