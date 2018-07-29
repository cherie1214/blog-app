import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, Button, Dimensions, StatusBar, ScrollView, StyleSheet } from 'react-native';
import styled, { css } from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import WriteCon from './WriteCon';

const { height, width } = Dimensions.get("window");


export default class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    

    return(
        <Wrap>
          <StatusBar hidden={true} />
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>글 쓰기</H1>
            <BtnSave title="저장" />
          </HeaderBox>
          <ScrollView style={height - 50}>
            <ConBox>
              <WriteCon />
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
`;


const BtnIcon = styled.TouchableOpacity`
`;

const H1 = styled.Text`
  z-index:-1;
  position:absolute;
  width: ${width};
  align-items: center;
  text-align:center;
  font-size:20px;
  font-family: 'hd-regular';
`;

const BtnSave = styled.Button`
`;

const ConBox = styled.View`
  flex:10;
`;

