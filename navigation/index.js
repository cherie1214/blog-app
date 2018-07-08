import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerActions } from 'react-navigation';

const { height, width } = Dimensions.get("window");

import Login from '../components/Login';
import Home from '../components/Home/Home';
import Menu from '../components/Menu'


const DrawerNavi = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Login: {
      screen: Login,
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
      <Menu />
    )
  }
);

export const SwitchNavi = createSwitchNavigator(
  {
    Home : {
      screen : DrawerNavi,
    },
    Login : {
      screen : Login,
    }
  },
  {
    initialRouteName : 'Home',
    // headerMode : 'none',
  }
)