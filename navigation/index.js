import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerActions } from 'react-navigation';

const { height, width } = Dimensions.get("window");

import Home from '../components/Home/Home';
import Menu from '../components/Menu'
import SignIn from '../components/Sign/SignIn';
import SignUp from '../components/Sign/SignUp';
import Like from '../components/Feed/Like';
import Notify from '../components/Feed/Notify';


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
  },
  {
    initialRouteName : 'Home',
  }
)