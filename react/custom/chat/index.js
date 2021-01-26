/* eslint-disable react/no-did-update-set-state */
// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { translate } from '../../features/base/i18n';
import { connect } from '../../features/base/redux';
import { _mapDispatchToProps } from '../../features/chat/components/AbstractChat';
import { isToolboxVisible } from '../../features/toolbox/functions';
import icw from '../constants';
import { isChatOverlayEnabled, getChatOverlayLimit } from '../utils';

import MessageContainer from './components/container';
import ChatInputBar from './components/input';

/**
 * Custom styles
 */
const styles = StyleSheet.create({
    wrapper: {
        bottom: 0,
        position: 'absolute',
        padding: icw.padding * 2,
        marginBottom: icw.chatOverlay.size,
        width: '100%'
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
    _last: number,
    _visible: boolean,
    _onSendMessage: Function
};

/**
 * State
 */
type State = {
    recieved: boolean
}

/**
 * Implements the UI elements to be displayed in the lonely meeting experience.
 */
class Overlay extends PureComponent<Props, State> {
    /**
     * Default state
     */
    state: State = {
        recieved: false
    };

    /**
     * Check for new message.
     *
     * @param {Props} prevProps - Previous props.
     * @returns {void}
     */
    componentDidUpdate(prevProps: Props): void {
        if (this.props._visible === false && prevProps._visible === true) {
            this.setState({
                recieved: false
            });
        } else if (!this.props._visible && this.props._last > prevProps._last) {
            this.setState({
                recieved: true
            });
        }
    }

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        // rozlozeni
        const { onPress, _enabled, _messages, _visible } = this.props;
        const { recieved } = this.state;

        // zobrazovat pouze pokud je prekryti povolene nevo pokud existuje nejake sdeleni
        if (!_enabled || _messages.length === 0) {
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
        if (_visible || recieved) {
            return (
                <View>
                    <TouchableWithoutFeedback onPress = { onPress }>
                        <View style = { styles.wrapper }>
                            <MessageContainer messages = { _messages } />
                        </View>
                    </TouchableWithoutFeedback>
                    <ChatInputBar onSend = { this.props._onSendMessage } />
                </View>
            );
        }

        return null;
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
    const messages = state['features/chat'].messages;
    const limit = getChatOverlayLimit(state);

    return {
        _enabled: isChatOverlayEnabled(state),
        _messages: messages.slice(0, limit),
        _last: messages.length > 0 ? messages[0].timestamp : 0,
        _visible: isToolboxVisible(state)
    };
}


export default connect(_mapStateToProps, _mapDispatchToProps)(translate(Overlay));
