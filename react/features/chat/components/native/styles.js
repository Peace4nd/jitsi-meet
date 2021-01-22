// @flow

import icw from '../../../../custom/constants';
import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';

const BUBBLE_RADIUS = 8;

/**
 * The styles of the feature chat.
 *
 * NOTE: Sizes and colors come from the 8x8 guidelines. This is the first
 * component to receive this treating, if others happen to have similar, we
 * need to extract the brand colors and sizes into a branding feature (planned
 * for the future).
 */
export default {
    chatKeyboardWrapper: {
        flex: 1,
        paddingBottom: icw.chat.size
    },

    /**
     * Wrapper View for the avatar.
     */
    avatarWrapper: {
        marginRight: 8,
        width: 32
    },

    chatLink: {
        color: ColorPalette.blue
    },

    /**
     * Wrapper for the details together, such as name, message and time.
     */
    detailsWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'column'
    },

    emptyComponentWrapper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: BoxModel.padding,
        paddingTop: '10%'
    },

    /**
     * A special padding to avoid issues on some devices (such as Android devices with custom suggestions bar).
     */
    extraBarPadding: {
        paddingBottom: 30
    },

    inputBar: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: icw.padding,
        margin: icw.padding * 1.5,
        borderRadius: icw.chat.size / 2,
        borderColor: icw.chat.field,
        borderWidth: icw.border.width,
        height: icw.chat.size
    },

    inputField: {
        color: icw.chat.text,
        flex: 1,
        marginRight: icw.padding
    },

    inputFieldMute: {
        color: icw.chat.textMute
    },

    messageBubble: {
        alignItems: 'center',
        borderRadius: BUBBLE_RADIUS,
        flexDirection: 'row'
    },

    messageContainer: {
        flex: 1
    },

    /**
     * Wrapper View for the entire block.
     */
    messageWrapper: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 17,
        marginVertical: 4
    },

    /**
     * Style modifier for the {@code detailsWrapper} for own messages.
     */
    ownMessageDetailsWrapper: {
        alignItems: 'flex-end'
    },

    replyWrapper: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    sendButtonIcon: {
        color: icw.chat.text,
        fontSize: 22
    },

    sendButtonIconDisabled: {
        opacity: 0.2
    },

    /**
     * Style modifier for system (error) messages.
     */
    systemMessageBubble: {
        backgroundColor: 'rgb(247, 215, 215)'
    },

    /**
     * Wrapper for the name and the message text.
     */
    textWrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 9
    },

    /**
     * Text node for the timestamp.
     */
    timeText: {
        color: 'rgb(164, 184, 209)',
        fontSize: 13
    }
};

ColorSchemeRegistry.register('Chat', {
    /**
     * Background of the chat screen.
     */
    backdrop: {
        backgroundColor: schemeColor('background'),
        flex: 1
    },

    /**
     * The text node for the display name.
     */
    displayName: {
        color: icw.chat.textMute,
        fontSize: 13
    },

    emptyComponentIcon: {
        color: icw.chat.text,
        marginBottom: 18
    },

    emptyComponentTitle: {
        color: icw.chat.text,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8
    },

    emptyComponentText: {
        color: icw.chat.text,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'normal'
    },

    localMessageBubble: {
        backgroundColor: icw.chat.bubbles.local.background,
        borderTopRightRadius: 0
    },

    localMessageText: {
        color: icw.chat.bubbles.local.color
    },

    messageRecipientCancelIcon: {
        color: schemeColor('icon'),
        fontSize: 18
    },

    messageRecipientContainer: {
        alignItems: 'center',
        backgroundColor: schemeColor('privateMsgBackground'),
        flexDirection: 'row',
        padding: BoxModel.padding
    },

    messageRecipientText: {
        color: schemeColor('text'),
        flex: 1
    },

    privateNotice: {
        color: schemeColor('privateMsgNotice'),
        fontSize: 11,
        marginTop: 6
    },

    privateMessageBubble: {
        backgroundColor: schemeColor('privateMsgBackground')
    },

    remoteMessageBubble: {
        backgroundColor: icw.chat.bubbles.remote.background,
        borderTopLeftRadius: 0
    },

    remoteMessageText: {
        color: icw.chat.bubbles.remote.color
    },

    replyContainer: {
        alignSelf: 'stretch',
        borderLeftColor: schemeColor('replyBorder'),
        borderLeftWidth: 1,
        justifyContent: 'center'
    },

    replyStyles: {
        iconStyle: {
            color: schemeColor('replyIcon'),
            fontSize: 22,
            padding: 8
        }
    }
});
