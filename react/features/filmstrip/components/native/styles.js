// @flow

import icw from '../../../../custom/constants';
import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { ColorPalette } from '../../../base/styles';
import { FILMSTRIP_SIZE } from '../../constants';

/**
 * Size for the Avatar.
 */
export const AVATAR_SIZE = 50;

/**
 * The styles of the feature filmstrip.
 */
export default {

    /**
     * The display name container.
     */
    displayNameContainer: {
        alignSelf: 'center',
        bottom: 0,
        flex: 1,
        margin: 4,
        position: 'absolute'
    },

    /**
     * The style of the narrow {@link Filmstrip} version which displays
     * thumbnails in a row at the bottom of the screen.
     */
    filmstripNarrow: {
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'flex-end',
        height: FILMSTRIP_SIZE
    },

    /**
     * The style of the wide {@link Filmstrip} version which displays thumbnails
     * in a column on the short size of the screen.
     *
     * NOTE: width is calculated based on the children, but it should also align
     * to {@code FILMSTRIP_SIZE}.
     */
    filmstripWide: {
        bottom: 200,
        flexDirection: 'column',
        flexGrow: 0,
        position: 'absolute',
        right: icw.padding,
        top: 30
    },

    /**
     * Container of the {@link LocalThumbnail}.
     */
    localThumbnail: {
        alignContent: 'stretch',
        alignSelf: 'stretch',
        aspectRatio: 1,
        flexShrink: 0,
        flexDirection: 'row'
    },

    moderatorIndicatorContainer: {
        bottom: 4,
        position: 'absolute',
        right: 4
    },

    /**
     * The style of the scrollview containing the remote thumbnails.
     */
    scrollView: {
        flexGrow: 0
    },

    /**
     * The style of a participant's Thumbnail which renders either the video or
     * the avatar of the associated participant.
     */
    thumbnail: {
        alignItems: 'stretch',
        backgroundColor: ColorPalette.appBackground,
        borderRadius: 8,
        flex: 1,
        height: icw.thumbnail.height,
        justifyContent: 'center',
        margin: icw.thumbnail.margin,
        marginBottom: 3 * icw.thumbnail.margin,
        overflow: 'hidden',
        position: 'relative',
        width: icw.thumbnail.width
    },

    thumbnailIndicatorIcon: {
        marginRight: icw.padding / 2
    },

    /**
     * The thumbnails indicator container.
     */
    thumbnailIndicatorContainer: {
        alignSelf: 'stretch',
        bottom: 4,
        flex: 1,
        flexDirection: 'row',
        left: 4,
        position: 'absolute'
    },

    thumbnailTopIndicatorContainer: {
        padding: 4,
        position: 'absolute',
        top: 0
    },

    thumbnailTopLeftIndicatorContainer: {
        left: 0
    },

    thumbnailTopRightIndicatorContainer: {
        right: 0
    },

    tileView: {
        alignSelf: 'center'
    },

    tileViewRows: {
        justifyContent: 'center'
    },

    tileViewRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
};

/**
 * Color schemed styles for the @{code Thumbnail} component.
 */
ColorSchemeRegistry.register('Thumbnail', {

    /**
     * Tinting style of the on-stage participant thumbnail.
     */
    activeThumbnailTint: {
        backgroundColor: schemeColor('activeParticipantTint')
    },

    /**
     * Coloring if the thumbnail background.
     */
    participantViewStyle: {
        backgroundColor: schemeColor('background')
    },

    /**
     * Pinned video thumbnail style.
     */
    thumbnailPinned: {
        shadowColor: schemeColor('activeParticipantHighlight'),
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowRadius: 5
    }
});
