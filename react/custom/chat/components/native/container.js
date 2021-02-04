// @flow

import React from 'react';
import { FlatList } from 'react-native';

import AbstractMessageContainer from '../../../../features/chat/components/AbstractMessageContainer';
import styles from '../../styles';

import ChatMessageGroup from './group';

export type Props = {

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
export default class MessageContainer extends AbstractMessageContainer<Props> {
    /**
     * Instantiates a new instance of the component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._renderMessageGroup = this._renderMessageGroup.bind(this);
    }

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const data = this._getMessagesGroupedBySender();

        return (
            <FlatList
                data = { data }
                inverted = { true }
                keyExtractor = { this._keyExtractor }
                keyboardShouldPersistTaps = 'always'
                renderItem = { this._renderMessageGroup }
                style = { styles.containerWrapper } />
        );
    }

    _keyExtractor = (_, index) => `key_${index}`;

    _getMessagesGroupedBySender: () => Array<Array<Object>>;

    _renderMessageGroup: Object => React$Element<any>;

    /**
     * Renders a single chat message.
     *
     * @param {Array<Object>} messages - The chat message to render.
     * @returns {React$Element<*>}
     */
    _renderMessageGroup({ item: messages }) {
        return (<ChatMessageGroup
            messages = { messages }
            onPress = { this.props.onPress }
            privateEnabled = { this.props.privateEnabled } />);
    }
}

