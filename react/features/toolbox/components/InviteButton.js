// @flow

import { IconIcewarpToolbarInvite } from '../../../custom/icons';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import { AbstractButton } from '../../base/toolbox/components';
import type { AbstractButtonProps } from '../../base/toolbox/components';
import { doInvitePeople } from '../../invite/actions.native';


/**
 * The type of the React {@code Component} props of {@link InviteButton}.
 */
type Props = AbstractButtonProps & {
    disabled: boolean;

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
}

/**
 * Component that renders a toolbar button for toggling audio mute.
 *
 * @extends AbstractButton
 */
class InviteButton extends AbstractButton<Props, *> {
    // accessibilityLabel = 'toolbar.accessibilityLabel.mute';
    label = 'icwCustom.toolbar.invite';
    tooltip = 'icwCustom.toolbar.invite';
    icon = IconIcewarpToolbarInvite;

    /**
     * Invite.
     *
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(doInvitePeople());
    }

    /**
     * Disabled button.
     *
     * @returns {boolean}
     */
    _isDisabled() {
        return this.props.disabled;
    }

}


export default translate(connect()(InviteButton));
