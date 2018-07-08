import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

const { height, width } = Dimensions.get("window");

import Home from '../components/Home/Home';
import ContentView from '../components/View';
import Menu from '../components/Menu'
import SignIn from '../components/Sign/SignIn';
import SignUp from '../components/Sign/SignUp';
import Like from '../components/Feed/Like';
import Notify from '../components/Feed/Notify';
import Mypage from '../components/My/Mypage';
import ChangePw from '../components/My/ChangePw';
import Write from '../components/Writing/Write';
import Edit from '../components/Writing/Edit';


const DrawerNavi = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
  }, 
  {
    drawerPosition : 'left',
    drawerWidth : width * 0.68,
    getCustomActionCreators: (route, stateKey) => {
        return {
          toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
        };
    },
    contentOptions: {
      itemsContainerStyle: {
        marginVertical: 0,
      },
    },
    contentComponent: (props) => (
      <Menu {...props} />
    )
  }
);

export const SwitchNavi = createSwitchNavigator(
  {
    Home : {
      screen : DrawerNavi,
    },
    View : {
      screen: ContentView,
    },
    SignIn : {
      screen : SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    Like: {
      screen: Like,
    },
    Notify: {
      screen: Notify,
    },
    Mypage: {
      screen: Mypage,
    },
    ChangePw: {
      screen: ChangePw,
    },
    Write: {
      screen: Write,
    },
    Edit: {
      screen: Edit,
    },
  },
  {
    initialRouteName : 'Home',
  }
)