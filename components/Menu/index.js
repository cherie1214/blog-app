import React, { Component } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';
import { connect } from 'react-redux';
import { likeIconRepeat, clearLikeIconRepeat } from '../../actions'


class Menu extends Component {

  componentDidUpdate(prevProps) {
    if(prevProps.login.loggedIn !== this.props.login.loggedIn && this.props.login.token) {
      this.props.likeIconRepeat(this.props.login.token);
    }
    if(prevProps.feed.likeIcon !== this.props.feed.likeIcon && !this.props.feed.likeIcon) {
      this.props.likeIconRepeat();
    }
    if(prevProps.feed.likeIcon !== this.props.feed.likeIcon && this.props.feed.likeIcon) {
      this.props.clearLikeIconRepeat();
    }
  }
    
  render() {
    const login = this.props.login;
    const { notifyIcon, likeIcon } = this.props.feed;
    
    return (
      <Wrap>
        {/* <Text>{this.props.login._id}</Text> */}
        {login.loggedIn ? (<SignedMenu notifyIcon={notifyIcon} likeIcon={likeIcon} />) : (<UnSignedMenu />)}
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
    likeIconRepeat : (token) => {
      return dispatch(likeIconRepeat(token));
    },
    clearLikeIconRepeat : () => {
      return dispatch(clearLikeIconRepeat());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);