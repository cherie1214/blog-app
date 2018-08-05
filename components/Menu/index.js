import React, { Component } from 'react';
// import {  } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';
import { connect } from 'react-redux';

class Menu extends Component {
    
  render() {
    const auth = this.props.auth;
    
    return (
      <Wrap>
        {auth.login.loggedIn ? (<SignedMenu />) : (<UnSignedMenu />)}
      </Wrap>
    );
  }
}
const Wrap = styled.View`
  flex: 1;
`;


const mapStateToProps = (state) => { 
  return {
    auth: state.redux.auth,
  }
}


export default connect(mapStateToProps)(Menu);