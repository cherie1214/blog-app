import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class Search extends Component {
  state = {
    inputValue: ""
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <Wrap>
        <Logo>Logo</Logo>
        <InputSearch
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          placeholder="Search"
          placeholderTextColor="#666"
        />
        <Button>
         <Feather name="search" color="#666" size={30} />
        </Button>
      </Wrap>  
    );
  }
}

const Wrap = styled.View`
  width: ${width * 0.75};
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: 5px;
  border-bottom-color: #ccc;
`;


const Logo = styled.Text`
  font-size: 50px;
  font-weight: 600;
`;

const InputSearch = styled.TextInput`
  
`;

const Button = styled.TouchableOpacity`
  
`;

