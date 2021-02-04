// @flow

import React from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';

import { translate } from '../../../../features/base/i18n';
import { Icon, IconChatSend, IconClose } from '../../../../features/base/icons';
import { connect } from '../../../../features/base/redux';
import { setPrivateMessageRecipient } from '../../../../features/chat/actions';
import icw from '../../../constants';
import styles from '../../styles';


type Props = {

    /**
     * Callback to invoke on message send.
     */
    onSend: Function,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function,

    /**
     * Private message recipient
     */
    _recipient: *,

    /**
     * End "private message" mode
     */
    _endPrivateMessage: Function;
};

type State = {

    /**
     * Boolean to show if an extra padding needs to be added to the bar.
     */
    focused: boolean,

    /**
     * The value of the input field.
     */
    message: string,

    /**
     * Boolean to show or hide the send button.
     */
    showSend: boolean
};

/**
 * Implements the chat input bar with text field and action(s).
 */
class ChatInputBar extends React.Component<Props, State> {
    /**
     * Input field reference
     */
    _inputRef: *;

    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            focused: false,
            message: '',
            showSend: false
        };

        this._inputRef = React.createRef();

        this._onChangeText = this._onChangeText.bind(this);
        this._onFocused = this._onFocused.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Component update.
     *
     * @param {Props} prevProps - Previous props.
     * @returns {void}
     */
    componentDidUpdate(prevProps: Props) {
        if (!prevProps._recipient && this.props._recipient && this._inputRef.current) {
            this._inputRef.current.focus();
        }
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _recipient, _endPrivateMessage, t } = this.props;
        const { message, showSend } = this.state;

        return (
            <View
                style = { [ styles.chatInputWrapper, _recipient ? styles.chatInputWrapperPrivate : null ] }>
                <TextInput
                    blurOnSubmit = { false }
                    multiline = { false }
                    onBlur = { this._onFocused(false) }
                    onChangeText = { this._onChangeText }
                    onFocus = { this._onFocused(true) }
                    onSubmitEditing = { this._onSubmit }
                    placeholder = {
                        _recipient ? t('chat.messageTo', { recipient: _recipient.name }) : t('chat.fieldPlaceHolder')
                    }
                    placeholderTextColor = { icw.chatOverlay.textMute }
                    ref = { this._inputRef }
                    returnKeyType = 'send'
                    style = { [ styles.chatInputField, showSend ? {} : styles.chatInputFieldMute ] }
                    value = { message } />

                <TouchableOpacity
                    disabled = { !showSend }
                    onPress = { this._onSubmit }
                    style = { styles.chatInputButton }>
                    <Icon
                        src = { IconChatSend }
                        style = { [
                            styles.chatInputSendIcon,
                            showSend ? {} : styles.chatInputSendIconDisabled
                        ] } />
                </TouchableOpacity>
                {/* _recipient && (
                    <TouchableOpacity
                        onPress = { _endPrivateMessage }
                        style = { styles.chatInputButton }>
                        <Icon
                            src = { IconClose }
                            style = { [
                                styles.chatInputSendIcon

                            ] } />
                    </TouchableOpacity>
                )*/}

                {/* _recipient && (
                    <View style = { styles.chatInputPrivate }>
                        <Text>{t('chat.messageTo', { recipient: _recipient.name })}</Text>
                    </View>
                )*/}
            </View>
        );
    }

    _onChangeText: string => void;

    /**
     * Callback to handle the change of the value of the text field.
     *
     * @param {string} text - The current value of the field.
     * @returns {void}
     */
    _onChangeText(text) {
        this.setState({
            message: text,
            showSend: Boolean(text)
        });
    }

    _onFocused: boolean => Function;

    /**
     * Constructs a callback to be used to update the padding of the field if necessary.
     *
     * @param {boolean} focused - True of the field is focused.
     * @returns {Function}
     */
    _onFocused(focused) {

        return () => {
            this.setState({
                focused
            });
        };

    }

    _onSubmit: () => void;

    /**
     * Callback to handle the submit event of the text field.
     *
     * @returns {void}
     */
    _onSubmit() {
        const message = this.state.message.trim();

        message && this.props.onSend(message);
        this.setState({
            message: '',
            showSend: false
        });
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
        _recipient: state['features/chat'].privateMessageRecipient
    };
}

/**
 * Maps part of the props of this component to Redux actions.
 *
 * @param {Function} dispatch - The Redux dispatch function.
 * @returns {Props}
 */
export function _mapDispatchToProps(dispatch: Function): $Shape<Props> {
    return {
        _endPrivateMessage: () => {
            dispatch(setPrivateMessageRecipient(null));
        }
    };
}

export default connect(_mapStateToProps, _mapDispatchToProps)(translate(ChatInputBar));
