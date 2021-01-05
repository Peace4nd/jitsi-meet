// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { BottomSheet, hideDialog, isDialogOpen } from '../../../base/dialog';
import { Icon, IconClose } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { AudioRouteButton } from '../../../mobile/audio-mode';
import { RoomLockButton } from '../../../room-lock';
import MuteEveryoneButton from '../MuteEveryoneButton';

import AudioOnlyButton from './AudioOnlyButton';
import RaiseHandButton from './RaiseHandButton';
import ToggleCameraButton from './ToggleCameraButton';
import styles from './styles';

/**
 * The type of the React {@code Component} props of {@link OverflowMenu}.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the dialog feature.
     */
    _bottomSheetStyles: StyleType,

    /**
     * True if the overflow menu is currently visible, false otherwise.
     */
    _isOpen: boolean,

    /**
     * Whether the recoding button should be enabled or not.
     */
    _recordingEnabled: boolean,

    /**
     * Used for hiding the dialog when the selection was completed.
     */
    dispatch: Function
};

type State = {

    /**
     * True if the bottom scheet is scrolled to the top.
     */
    scrolledToTop: boolean,

    /**
     * True if the 'more' button set needas to be rendered.
     */
    showMore: boolean
}

/**
 * The exported React {@code Component}. We need it to execute
 * {@link hideDialog}.
 *
 * XXX It does not break our coding style rule to not utilize globals for state,
 * because it is merely another name for {@code export}'s {@code default}.
 */
let OverflowMenu_; // eslint-disable-line prefer-const

/**
 * Implements a React {@code Component} with some extra actions in addition to
 * those in the toolbar.
 */
class OverflowMenu extends PureComponent<Props, State> {
    /**
     * Initializes a new {@code OverflowMenu} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            scrolledToTop: true,
            showMore: false
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onToggleMenu = this._onToggleMenu.bind(this);
        this._renderMenuExpandToggle = this._renderMenuExpandToggle.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _bottomSheetStyles } = this.props;

        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };

        return (
            <BottomSheet
                onCancel = { this._onCancel }
                renderHeader = { this._renderMenuExpandToggle }>
                <AudioRouteButton { ...buttonProps } />
                <AudioOnlyButton { ...buttonProps } />
                <MuteEveryoneButton { ...buttonProps } />
                <RoomLockButton { ...buttonProps } />
                <RaiseHandButton { ...buttonProps } />
                <ToggleCameraButton { ...buttonProps } />
            </BottomSheet>
        );
    }

    _renderMenuExpandToggle: () => React$Element<any>;

    /**
     * Function to render the menu toggle in the bottom sheet header area.
     *
     * @returns {React$Element}
     */
    _renderMenuExpandToggle() {
        return (
            <View
                style = { [
                    this.props._bottomSheetStyles.sheet,
                    styles.expandMenuContainer
                ] }>
                <TouchableOpacity onPress = { this._onCancel }>
                    <Icon
                        src = { IconClose }
                        style = { this.props._bottomSheetStyles.expandIcon } />
                </TouchableOpacity>
            </View>
        );
    }

    _onCancel: () => boolean;

    /**
     * Hides this {@code OverflowMenu}.
     *
     * @private
     * @returns {boolean}
     */
    _onCancel() {
        if (this.props._isOpen) {
            this.props.dispatch(hideDialog());

            return true;
        }

        return false;
    }

    _onToggleMenu: () => void;

    /**
     * Callback to be invoked when the expand menu button is pressed.
     *
     * @returns {void}
     */
    _onToggleMenu() {
        this.setState({
            showMore: !this.state.showMore
        });
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, OverflowMenu_)
    };
}

OverflowMenu_ = connect(_mapStateToProps)(OverflowMenu);

export default OverflowMenu_;
