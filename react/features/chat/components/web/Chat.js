// @flow

import React from 'react';

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import AbstractChat, {
    _mapDispatchToProps,
    _mapStateToProps,
    type Props
} from '../AbstractChat';

import ChatDialog from './ChatDialog';
import Header from './ChatDialogHeader';
import ChatInput from './ChatInput';
import DisplayNameForm from './DisplayNameForm';
import MessageContainer from './MessageContainer';
import MessageRecipient from './MessageRecipient';

let activeTimeout = null;

/**
 * React Component for holding the chat feature in a side panel that slides in
 * and out of view.
 */
class Chat extends AbstractChat<Props, *> {

    /**
     * Whether or not the {@code Chat} component is off-screen, having finished
     * its hiding animation.
     */
    _isExited: boolean;

    /**
     * Reference to the React Component for displaying chat messages. Used for
     * scrolling to the end of the chat messages.
     */
    _messageContainerRef: Object;

    /**
     * Initializes a new {@code Chat} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            active: false
        };

        this._isExited = true;
        this._messageContainerRef = React.createRef();

        // Bind event handlers so they are only bound once for every instance.
        this._renderPanelContent = this._renderPanelContent.bind(this);

        // Bind event handlers so they are only bound once for every instance.
        this._onChatInputResize = this._onChatInputResize.bind(this);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
    }

    /**
     * Implements {@code Component#componentDidMount}.
     *
     * @inheritdoc
     */
    componentDidMount() {
        this._scrollMessageContainerToBottom(true);
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    componentDidUpdate(prevProps) {

        this._scrollMessageContainerToBottom(true);

    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <>
                { this._renderPanelContent() }
            </>
        );
    }

    _onChatInputResize: () => void;

    /**
     * Callback invoked when {@code ChatInput} changes height. Preserves
     * displaying the latest message if it is scrolled to.
     *
     * @private
     * @returns {void}
     */
    _onChatInputResize() {
        this._messageContainerRef.current.maybeUpdateBottomScroll();
    }

    /**
     * Returns a React Element for showing chat messages and a form to send new
     * chat messages.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderChat() {
        return (
            <>
                <MessageContainer
                    messages = { this.props._messages }
                    ref = { this._messageContainerRef } />
                <MessageRecipient />
                <ChatInput
                    onResize = { this._onChatInputResize }
                    onSend = { this.props._onSendMessage } />
            </>
        );
    }

    /**
     * Instantiates a React Element to display at the top of {@code Chat} to
     * close {@code Chat}.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderChatHeader() {
        return (
            <Header
                className = 'chat-header'
                onCancel = { this.props._onToggleChat } />
        );
    }

    _renderPanelContent: () => React$Node | null;

    /**
     * Renders the contents of the chat panel.
     *
     * @private
     * @returns {ReactElement | null}
     */
    _renderPanelContent() {
        const { _isModal, _isOpen, _showNamePrompt, _visible } = this.props;

        return (
            <div
                className = { `sideToolbarContainer${_visible || this.state.active ? ' visible' : ''}` }
                id = 'sideToolbarContainer'
                onMouseEnter = { this._onMouseEnter }
                onMouseLeave = { this._onMouseLeave }>
                { _showNamePrompt ? <DisplayNameForm /> : this._renderChat() }
            </div>
        );
    }

    _onMouseEnter: () => void;

    /**
     * Mouse enter.
     *
     * @returns {void}
     */
    _onMouseEnter() {
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
            this.setState({
                active: true
            });
        }, 1500);
    }

    _onMouseLeave: () => void;

    /**
     * Mouse leave.
     *
     * @returns {void}
     */
    _onMouseLeave() {
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
            this.setState({
                active: false
            });
        }, 1500);
    }

    /**
     * Scrolls the chat messages so the latest message is visible.
     *
     * @param {boolean} withAnimation - Whether or not to show a scrolling
     * animation.
     * @private
     * @returns {void}
     */
    _scrollMessageContainerToBottom(withAnimation) {
        if (this._messageContainerRef.current) {
            this._messageContainerRef.current.scrollToBottom(withAnimation);
        }
    }
}

export default translate(connect(_mapStateToProps, _mapDispatchToProps)(Chat));
