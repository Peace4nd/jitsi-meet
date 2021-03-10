// @flow

import React from 'react';
import { Text, View } from 'react-native';

import { Avatar } from '../../../../features/base/avatar';
import { translate } from '../../../../features/base/i18n';
import { Linkify } from '../../../../features/base/react';
import AbstractChatMessage, { type Props } from '../../../../features/chat/components/AbstractChatMessage';
import PrivateMessageButton from '../../../../features/chat/components/PrivateMessageButton';
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_LOCAL, MESSAGE_TYPE_REMOTE } from '../../../../features/chat/constants';
import { replaceNonUnicodeEmojis } from '../../../../features/chat/functions';
import styles from '../../styles';

/**
 * Renders a single chat message.
 */
class ChatMessage extends AbstractChatMessage<Props & { privateEnabled: boolean }> {
    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        // properties
        const { message, privateEnabled, showDisplayName } = this.props;

        // defnitions
        const messageBubbleStyle = [
            styles.messageBubble
        ];
        const messageBubbleText = null;

        // message type
        switch (message.messageType) {
            case MESSAGE_TYPE_LOCAL:
                messageBubbleStyle.push(styles.messageBubbleLocal);
                break;

            case MESSAGE_TYPE_REMOTE:
                messageBubbleStyle.push(styles.messageBubbleRemote);
                break;

            case MESSAGE_TYPE_ERROR:
                messageBubbleStyle.push(styles.messageBubbleSystem);
                break;
        }

        // private message
        if (message.privateMessage) {

            // pokud neni povoleno
            if (!privateEnabled) {
                return null;
            }

            messageBubbleStyle.push(styles.messageBubblePrivate);

            // messageBubbleText = styles.messageBubblePrivateText;
        }

        // build and return
        return (
            <View style = { styles.messageWrapper } >
                { this._renderAvatar() }

                <View style = { messageBubbleStyle }>
                    <View style = { styles.messageTextWrapper } >
                        {showDisplayName && (<Text style = { [ styles.messageNameWrapper, messageBubbleText ] }>
                            { message.displayName }
                        </Text>)}
                        <Linkify
                            linkStyle = { styles.messageTextLink }
                            textStyle = { [ styles.messageBubbleText, messageBubbleText ] }>
                            { replaceNonUnicodeEmojis(this._getMessageText()) }
                        </Linkify>
                        { this._renderPrivateNotice() }
                    </View>
                    { this._renderPrivateReplyButton() }

                </View>
            </View>
        );
    }

    _getFormattedTimestamp: () => string;

    _getMessageText: () => string;

    _getPrivateNoticeMessage: () => string;

    /**
     * Renders the avatar of the sender.
     *
     * @returns {React$Element<*>}
     */
    _renderAvatar() {
        const { message } = this.props;

        return (
            <View style = { styles.messageAvatarWrapper }>
                { this.props.showAvatar && <Avatar
                    displayName = { message.displayName }
                    participantId = { message.id }
                    size = { styles.messageAvatarWrapper.width } />
                }
            </View>
        );
    }

    /**
     * Renders the message privacy notice, if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderPrivateNotice() {
        const { message } = this.props;

        if (!message.privateMessage) {
            return null;
        }

        return (
            <Text style = { styles.messageBubblePrivateNotice }>
                { this._getPrivateNoticeMessage() }
            </Text>
        );
    }

    /**
     * Renders the private reply button, if necessary.
     *
     * @returns {React$Element<*> | null}
     */
    _renderPrivateReplyButton() {
        const { message } = this.props;
        const { messageType, privateMessage } = message;

        if (!privateMessage || messageType === MESSAGE_TYPE_LOCAL) {
            return null;
        }

        return (
            <View style = { styles.messageReplyWrapper }>
                <PrivateMessageButton
                    participantID = { message.id }
                    reply = { true }
                    showLabel = { false }
                    toggledStyles = {{ iconStyle: styles.messageReplyIcon }} />
            </View>
        );
    }
}

export default translate(ChatMessage);
