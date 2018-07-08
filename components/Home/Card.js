import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import CardItem from './CardItem';

const { height, width } = Dimensions.get("window");

export default class Card extends Component {
 

  render() {
    return (
      <Wrap>
        <CardItem props={this.props} />
      </Wrap>  
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


