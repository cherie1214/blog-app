import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Font, Constants, AppLoading } from 'expo';

import { SwitchNavi } from './navigation';

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

// Combine Navigation with Redux
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

// Middleware & store
const navReducer = createNavigationReducer(SwitchNavi);
const appReducer = combineReducers({
  nav: navReducer,
  redux: reducers
});


const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const App = reduxifyNavigator(SwitchNavi, "root");
const mapStateToProps = (state) => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(thunk, navigationMiddleware));

export default class Root extends Component {
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
        <AppWithNavigationState />
      </Provider>
    )
  }   
  
}

