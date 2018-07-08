import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import { SwitchNavi } from './navigation';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavi />
      </Provider>
    );
  }
}

