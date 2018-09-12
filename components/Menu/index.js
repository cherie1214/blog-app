import React, { Component } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';
import { connect } from 'react-redux';
import { notifyIconReapeat, clearNotifyIconReapeat } from '../../actions'


class Menu extends Component {

  // componentDidUpdate(prevProps) {
  //   if(prevProps.login.loggedIn !== this.props.login.loggedIn && this.props.login.token) {
  //     this.props.notifyIconReapeat(this.props.login.token);
  //   }
  //   if(prevProps.feed.notifyIcon !== this.props.feed.notifyIcon && !this.props.feed.notifyIcon) {
  //     this.props.notifyIconReapeat();
  //   }
  //   if(prevProps.feed.notifyIcon !== this.props.feed.notifyIcon && this.props.feed.notifyIcon) {
  //     this.props.clearNotifyIconReapeat();
  //   }
  // }
    
  render() {
    const login = this.props.login;
    const { notifyIcon } = this.props.feed;
    
    return (
      <Wrap>
        {/* <Text>{this.props.login.token}</Text> */}
        {login.loggedIn ? (<SignedMenu notifyIcon={notifyIcon} />) : (<UnSignedMenu />)}
      </Wrap>
    );
  }
}
const Wrap = styled.View`
  flex: 1;
`;


const mapStateToProps = (state) => { 
  return {
    login: state.redux.auth.login,
    feed: state.redux.feed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    notifyIconReapeat : (token) => {
      return dispatch(notifyIconReapeat(token));
    },
    clearNotifyIconReapeat : () => {
      return dispatch(clearNotifyIconReapeat());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);