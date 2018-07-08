import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons } from '@expo/vector-icons';

// components
import Search from './Search';
import Card from './Card';

const { height, width } = Dimensions.get("window");

export default class Home extends Component {

  render() {
    return (
      <Container>
        <HomeHeader>
          <Search />
        </HomeHeader>
        <HomeBody>
          <Card />
        </HomeBody>
        <HomeFooter>
          <Button>
            <SimpleLineIcons name="plus" color="#333" size={30} />
          </Button>
        </HomeFooter>
        
      </Container>
    );
  }
}

const Container = styled.View`
    flex : 1;
    justify-content: flex-start;
`;

const HomeHeader = styled.View`
  flex: 3;
  padding-bottom:5%;
  align-items: flex-end
  flex-direction: row;
  justify-content: flex-end;
`;

const HomeBody = styled.View`
    flex : 6;
`;

const HomeFooter = styled.View`
    flex : 1.5;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
  
`;
