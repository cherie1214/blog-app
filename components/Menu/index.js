import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';

export default class Menu extends Component {
  state = {
      isLoggedIn: false,
  }
    
  render() {
    const { isLoggedIn } = this.state;
    
    return (
      <Wrap>
        {isLoggedIn ? (<SignedMenu />) : (<UnSignedMenu props={this.props} />)}
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
`;
