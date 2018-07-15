import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';
import { connect } from 'react-redux';

class Menu extends Component {
    
  render() {
    const { isLoggedIn } = this.props.status;
    
    return (
      <Wrap>
        {isLoggedIn ? (<SignedMenu />) : (<UnSignedMenu />)}
      </Wrap>
    );
  }
}
const Wrap = styled.View`
  flex: 1;
`;


const mapStateToProps = (state) => { 
  return {
    status: state.redux.auth.status,
  }
}


export default connect(mapStateToProps)(Menu);