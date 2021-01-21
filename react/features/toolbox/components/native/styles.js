// @flow

import { Dimensions } from 'react-native';

import icw from '../../../../custom/constants';
import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { ColorPalette } from '../../../base/styles';

const { width } = Dimensions.get('window');

export const BUTTON_MARGIN = 5;
export const BORDER_RADIUS = 15;
export const calcButtonSize = () => {
    const defaultSize = 50;

    return Math.min(((width - (2 * icw.padding)) / 5) - (2 * BUTTON_MARGIN), defaultSize);
};


// Toolbox, toolbar:

/**
 * The style of toolbar buttons.
 */
const btnSize = calcButtonSize();
const toolbarButton = {
    backgroundColor: schemeColor('button'),
    borderRadius: btnSize / 2,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: btnSize,
    justifyContent: 'center',
    marginHorizontal: BUTTON_MARGIN,
    width: btnSize
};

/**
 * The icon style of the toolbar buttons.
 */
const toolbarButtonIcon = {
    alignSelf: 'center',
    color: ColorPalette.white,
    fontSize: 22
};

/**
 * The style of toolbar buttons which display white icons.
 */
const whiteToolbarButton = {
    ...toolbarButton,
    backgroundColor: schemeColor('buttonToggled')
};

/**
 * The icon style of toolbar buttons which display white icons.
 */
const whiteToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: ColorPalette.white
};


const toolbar = {
    alignItems: 'center',
    backgroundColor: icw.background.base,
    borderTopLeftRadius: icw.border.radius,
    borderTopRightRadius: icw.border.radius,
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'space-between',
    paddingHorizontal: icw.padding,
    paddingVertical: icw.padding * 2
};

/**
 * The Toolbox and toolbar related styles.
 */
const styles = {

    expandMenuContainer: {
        alignItems: 'flex-end',
        backgroundColor: icw.background.base,
        borderTopLeftRadius: icw.border.radius,
        borderTopRightRadius: icw.border.radius,
        flexDirection: 'column',
        paddingRight: icw.padding,
        paddingTop: icw.padding
    },

    sheetGestureRecognizer: {
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    /**
     * The style of the toolbar.
     */
    toolbar,

    toolbarOverflow: {
        ...toolbar,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },

    /**
     * The style of the root/top-level {@link Container} of {@link Toolbox}.
     */
    toolbox: {
        flexDirection: 'column',
        flexGrow: 0
    }
};

export default styles;

/**
 * Color schemed styles for the @{Toolbox} component.
 */
ColorSchemeRegistry.register('Toolbox', {
    /**
     * Styles for buttons in the toolbar.
     */
    buttonStyles: {
        iconStyle: toolbarButtonIcon,
        style: toolbarButton
    },

    /**
     * Overrides to the standard styles that we apply to the chat button, as
     * that behaves slightly differently to other buttons.
     */
    chatButtonOverride: {
        toggled: {
            backgroundColor: ColorPalette.blue
        }
    },

    hangupButtonStyles: {
        iconStyle: toolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: schemeColor('hangup')
        }

        // underlayColor: ColorPalette.buttonUnderlay
    },

    /**
     * Styles for toggled buttons in the toolbar.
     */
    toggledButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...whiteToolbarButton,
            borderColor: schemeColor('buttonToggledBorder'),
            borderWidth: 1
        }
    }
});
