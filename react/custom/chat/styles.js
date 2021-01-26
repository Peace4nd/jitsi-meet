// @flow

import { StyleSheet } from 'react-native';

import icw from '../constants';

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
        borderRadius: 20,
        flexDirection: 'row'
    },
    messageBubbleText: {
        color: icw.chatOverlay.text,
        fontSize: 13,
        lineHeight: 14,
        letterSpacing: -0.33
    },
    messageBubbleLocal: {
        backgroundColor: icw.chatOverlay.bubbles.local
    },
    messageBubbleRemote: {
        backgroundColor: icw.chatOverlay.bubbles.remote
    },
    messageBubbleSystem: {
        backgroundColor: icw.chatOverlay.bubbles.system
    },
    messageBubblePrivate: {
        backgroundColor: icw.chatOverlay.bubbles.private
    },
    messageBubblePrivateNotice: {
        color: icw.chatOverlay.private.notice,
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
        color: icw.chatOverlay.text,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: -0.33
    },
    messageReplyWrapper: {
        alignSelf: 'stretch',
        borderLeftColor: icw.chatOverlay.private.reply.divider,
        borderLeftWidth: 1,
        justifyContent: 'center'
    },
    messageReplyIcon: {
        color: icw.chatOverlay.private.reply.icon,
        fontSize: 22,
        padding: 8
    },

    // wrapper
    wrapper: {
        bottom: 0,
        position: 'absolute',
        padding: icw.padding * 2,
        marginBottom: icw.chatOverlay.size + icw.padding,
        width: '100%'
    }
});

export default styles;
