/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {
  state = {
    message: []
  }

  componentDidMount() {
    this.ref = firebase.firestore().collection('messages');

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSend = (messages = []) => {
    messages.forEach((message) => {
      this.ref.add(message);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    this.setState({ messages });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
          name: 'John Doe'
        }}
      />
    );
  }
}