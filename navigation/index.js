import React, { Component } from 'react';

import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerActions } from 'react-navigation';

import Login from '../components/Login';
import Home from '../components/Home/Home';

export const SwitchNavi = createSwitchNavigator(
  {
    Home : {
      screen : Home,
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