// @flow

import { StyleSheet } from 'react-native';

import icw from '../constants';

const BUBBLE_RADIUS = 8;

export const styles = StyleSheet.create({
    // input
    chatInputField: {
        color: icw.chatOverlay.text,
        flex: 1,
        marginRight: icw.padding
    },
    chatInputFieldMute: {
        color: icw.chatOverlay.textMute
    },
    chatInputSendIcon: {
        color: icw.chatOverlay.text,
        fontSize: 22
    },
    chatInputSendIconDisabled: {
        color: icw.chatOverlay.textMute
    },
    chatInputWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: icw.padding,
        margin: icw.padding * 1.5,
        borderRadius: icw.chatOverlay.size / 2,
        borderColor: icw.chatOverlay.field,
        borderWidth: icw.border.width,
        height: icw.chatOverlay.size
    },

    // container + group
    containerWrapper: {
        flex: 1
    },

    // message
    messageWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 4
    },
    messageBubble: {
        alignItems: 'center',
        borderRadius: BUBBLE_RADIUS,
        borderTopLeftRadius: 0,
        flexDirection: 'row'
    },
    messageBubbleLocal: {
        backgroundColor: icw.chatOverlay.bubbles.local.background
    },
    messageBubbleLocalText: {
        color: icw.chatOverlay.bubbles.local.color
    },
    messageBubbleRemote: {
        backgroundColor: icw.chatOverlay.bubbles.remote.background
    },
    messageBubbleRemoteText: {
        color: icw.chatOverlay.bubbles.remote.color
    },
    messageBubbleSystem: {
        backgroundColor: icw.chatOverlay.bubbles.system.background
    },
    messageBubblePrivate: {
        backgroundColor: icw.chatOverlay.bubbles.private.background
    },
    messageBubblePrivateNotice: {
        color: icw.chatOverlay.bubbles.private.notice,
        fontSize: 11,
        marginTop: 6
    },
    messageTextWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 9
    },
    messageTextLink: {
        color: icw.chatOverlay.link
    },
    messageAvatarWrapper: {
        marginRight: 8,
        width: 32
    },
    messageNameWrapper: {
        fontSize: 13
    },
    messageNameRemote: {
        color: `${icw.chatOverlay.bubbles.remote.color}80`
    },
    messageNameLocal: {
        color: `${icw.chatOverlay.bubbles.local.color}80`
    },
    messageReplyWrapper: {
        alignSelf: 'stretch',
        borderLeftColor: icw.chatOverlay.bubbles.private.reply.divider,
        borderLeftWidth: 1,
        justifyContent: 'center'
    },
    messageReplyIcon: {
        color: icw.chatOverlay.bubbles.private.reply.icon,
        fontSize: 22,
        padding: 8
    }
});

export default styles;
