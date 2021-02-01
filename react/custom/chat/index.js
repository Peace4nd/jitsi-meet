/* eslint-disable react/no-did-update-set-state */
// @flow

import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, View, TouchableWithoutFeedback, Platform } from 'react-native';

import { translate } from '../../features/base/i18n';
import { connect } from '../../features/base/redux';
import { _mapDispatchToProps } from '../../features/chat/components/AbstractChat';
import { isToolboxVisible } from '../../features/toolbox/functions';
import { isChatOverlayEnabled, getChatOverlayLimit, isPrivateMessageEnabled } from '../utils';

import MessageContainer from './components/container';
import ChatInputBar from './components/input';
import styles from './styles';

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
    _onSendMessage: Function,
    _privateEnabled: boolean
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
        const { onPress, _enabled, _messages, _privateEnabled, _visible } = this.props;
        const { recieved } = this.state;

        // zobrazovat pouze pokud je prekryti povolene nevo pokud existuje nejake sdeleni
        if (!_enabled) {
            return null;
        }

        // sestaveni a vraceni
        if (_visible || recieved) {
            return (
                <TouchableWithoutFeedback onPress = { onPress }>
                    <KeyboardAvoidingView
                        behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
                        keyboardVerticalOffset = { Platform.OS === 'ios' ? 64 : 0 }
                        style = {{ flex: 1,
                            justifyContent: 'flex-end' }}>
                        <MessageContainer
                            messages = { _messages }
                            privateEnabled = { _privateEnabled } />
                        <ChatInputBar onSend = { this.props._onSendMessage } />
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
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
        _visible: isToolboxVisible(state),
        _privateEnabled: isPrivateMessageEnabled(state)
    };
}


export default connect(_mapStateToProps, _mapDispatchToProps)(translate(Overlay));
