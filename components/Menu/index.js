import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import SignedMenu from './Signed';
import UnSignedMenu from './UnSigned';

export default class Menu extends Component {
  state = {
      isSigned: false,
  }
    
  render() {
    const { isSigned } = this.state;
    
    return (
      <Wrap>
        {isSigned ? (<SignedMenu />) : (<UnSignedMenu />)}
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
`;
