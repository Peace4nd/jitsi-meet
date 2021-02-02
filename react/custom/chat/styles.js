// @flow

import { StyleSheet, Dimensions } from 'react-native';

import icw from '../constants';

const { width } = Dimensions.get('window');

const AVATAR_WIDTH = 32;
const WRAPPER_WIDTH = width - ((icw.thumbnail.margin * 2) + icw.thumbnail.width + icw.padding) - icw.padding;
const PRIVATE_HEIGHT = Math.ceil(icw.chatOverlay.size); //* (2 / 3)
const MARGIN_SIDES = icw.padding * 1.5;


// 2x2 wrapper padding, 1x avatar rightMargin, 2x1.5 text padding
const TEXT_WIDTH = WRAPPER_WIDTH - AVATAR_WIDTH - (8 * icw.padding);

export const styles = StyleSheet.create({
    // input
    chatInputField: {
        color: icw.chatOverlay.text,
        flex: 1,
        borderRadius: icw.chatOverlay.size / 2,
        borderColor: icw.chatOverlay.field,
        borderWidth: icw.border.width,
        paddingLeft: icw.padding * 2,
        paddingRight: icw.chatOverlay.size + icw.padding,
        marginHorizontal: MARGIN_SIDES
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
        flex: 0,
        height: icw.chatOverlay.size
    },
    chatInputWrapperPrivate: {
        borderColor: icw.color.danger,
        paddingRight: icw.chatOverlay.size + icw.padding
    },
    chatInputPrivate: {
        alignItems: 'center',
        backgroundColor: icw.color.danger,
        borderRadius: PRIVATE_HEIGHT / 2,
        color: icw.chatOverlay.text,
        flexDirection: 'row',
        height: PRIVATE_HEIGHT,
        justifyContent: 'center',
        left: -icw.border.width,
        paddingHorizontal: 2 * icw.padding,
        position: 'absolute',
        right: -icw.border.width,
        top: -PRIVATE_HEIGHT - icw.padding
    },
    chatInputButton: {
        alignItems: 'center',
        borderRadius: icw.chatOverlay.size,
        bottom: -icw.border.width,
        justifyContent: 'center',
        position: 'absolute',
        right: MARGIN_SIDES - icw.border.width,
        top: -icw.border.width,
        width: icw.chatOverlay.size
    },
    chatInputPrivateEnd: {
        alignItems: 'center',
        backgroundColor: icw.color.danger,
        borderRadius: icw.chatOverlay.size / 2,
        bottom: -icw.border.width,
        justifyContent: 'center',
        position: 'absolute',
        right: -icw.border.width,
        top: -icw.border.width,
        width: icw.chatOverlay.size
    },

    // container + group
    containerWrapper: {
        paddingLeft: icw.padding * 2,
        paddingRight: icw.padding,
        paddingBottom: icw.chatOverlay.size + icw.padding,
        width: WRAPPER_WIDTH,
        flex: 1

    },
    containerGroup: {
        width: WRAPPER_WIDTH,
        flex: 1
    },

    // message
    messageWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginBottom: icw.padding
    },
    messageBubble: {
        alignItems: 'center',
        borderRadius: 20,
        flex: 0,
        flexDirection: 'row',
        paddingVertical: icw.padding,
        paddingHorizontal: MARGIN_SIDES
    },
    messageBubbleText: {
        color: icw.chatOverlay.text,
        fontSize: 13,
        lineHeight: 14,
        letterSpacing: -0.33,
        maxWidth: TEXT_WIDTH
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
        flexDirection: 'column'
    },
    messageTextLink: {
        color: icw.chatOverlay.link
    },
    messageAvatarWrapper: {
        marginRight: icw.padding,
        width: AVATAR_WIDTH
    },
    messageNameWrapper: {
        color: icw.chatOverlay.text,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: -0.33,
        paddingBottom: icw.padding / 2
    },
    messageReplyWrapper: {
        alignSelf: 'stretch',
        borderLeftColor: icw.chatOverlay.private.reply.divider,
        borderLeftWidth: 1,
        justifyContent: 'center',
        marginLeft: icw.padding
    },
    messageReplyIcon: {
        color: icw.chatOverlay.private.reply.icon,
        fontSize: 22,
        paddingLeft: icw.padding
    },

    // wrapper
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});

export default styles;
