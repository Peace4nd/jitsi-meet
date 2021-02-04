// @flow

import React, { Component } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';

import styles from '../../styles';

import ChatMessage from './message';

type Props = {

  /**
   * The messages array to render.
   */
  messages: Array<Object>,

  privateEnabled: boolean,

  onPress: Function
}

/**
 * Implements a container to render all the chat messages in a conference.
 */
export default class ChatMessageGroup extends Component<Props> {
    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._renderMessage = this._renderMessage.bind(this);
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <TouchableWithoutFeedback onPress = { this.props.onPress }>
                <FlatList
                    data = { this.props.messages }
                    inverted = { true }
                    keyExtractor = { this._keyExtractor }
                    renderItem = { this._renderMessage }
                    style = { styles.containerGroup } />
            </TouchableWithoutFeedback>
        );
    }

    _keyExtractor = (_, index) => `key_${index}`;

    _renderMessage: Object => React$Element<*>;

    /**
     * Renders a single chat message.
     *
     * @param {Object} message - The chat message to render.
     * @returns {React$Element<*>}
     */
    _renderMessage({ index, item }) {
        const isLast = index === this.props.messages.length - 1;

        return (
            <ChatMessage
                message = { item }
                privateEnabled = { this.props.privateEnabled }
                showAvatar = { isLast }
                showDisplayName = { isLast }
                showTimestamp = { index === 0 } />
        );
    }
}
