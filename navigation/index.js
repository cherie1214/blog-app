import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

const { height, width } = Dimensions.get("window");

import Home from '../components/Home/Home';
import Search from '../components/Search';
import ArticleTab from '../components/Search/ArticleTab';
import WriterTab from '../components/Search/WriterTab';
import ArticleView from '../components/View/ArticleView';
import WriterView from '../components/View/WriterView';
import Menu from '../components/Menu'
import SignIn from '../components/Sign/SignIn';
import SignUp from '../components/Sign/SignUp';
import Like from '../components/Feed/Like';
import Notify from '../components/Feed/Notify';
import Mypage from '../components/My/Mypage';
import ChangePw from '../components/My/ChangePw';
import Write from '../components/Article/Write';
import Edit from '../components/Article/Edit';
import List from '../components/Article/List';
import Camera from '../components/Photo/Camera';
import CameraRoll from '../components/Photo/CameraRoll';
import CameraRollBak from '../components/Photo/CameraRollBak';


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

const SearchTabNavi = createStackNavigator(
  {
    ArticleTab: {
      screen: ArticleTab,
    },
    WriterTab: {
      screen: WriterTab,
    }    
  },
  {
    initialRouteName : 'ArticleTab',
  }
)

export const SwitchNavi = createSwitchNavigator(
  {
    Home : {
      screen : DrawerNavi,
    },
    Search : {
      screen: Search,
    },
    ArticleView : {
      screen: ArticleView,
    },
    WriterView : {
      screen: WriterView,
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
    List: {
      screen: List,
    }, 
    Camera: {
      screen: Camera,
    },
    CameraRoll: {
      screen: CameraRoll,
    },
    CameraRollBak: {
      screen: CameraRollBak,
    },
  },
  {
    initialRouteName : 'Home',
  }
)