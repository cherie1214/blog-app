import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Font, Constants, AppLoading } from 'expo';

import { SwitchNavi } from './navigation';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }


  async componentDidMount() {
    await Font.loadAsync({
      'hd-black': require('./assets/fonts/hyundai_black.ttf'),
      'hd-bold': require('./assets/fonts/hyundai_bold.ttf'),
      'hd-regular': require('./assets/fonts/hyundai_regular.ttf'),
      'iropke': require('./assets/fonts/IropkeBatangM.ttf')
    })
    this.setState({ fontLoaded: true })
  }
  
  
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <SwitchNavi />
      </Provider>
    )
  }   
  
}

