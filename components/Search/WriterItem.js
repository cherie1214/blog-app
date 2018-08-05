import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, StatusBar, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import styled, { css } from 'styled-components';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class WriterItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      writerNickname: 'nickname',
      articleNum: 3,
    }
  }


  render(){
    const { writerNickname, articleNum } = this.state;
    
    return (
      <Wrap>  
        <Row>
          <WriterBox>
            <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
            <WriterText>{writerNickname}</WriterText>
          </WriterBox>
          <ArticleNumText>글수 {articleNum}</ArticleNumText>
        </Row>
      </Wrap>
    )
  }
}
    
const Wrap = styled.TouchableOpacity`
  padding: 5% 7%;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const Row = styled.View`
  margin-bottom: 7%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WriterBox = styled.View`  
  flex-direction: row;
  align-items: center;
`;

const ProfileImgBox = styled.Image`
  width : 40px;
  height : 40px;
  border-radius : 20px;
  margin-right : 7px;
  background-color : transparent;
`;

const WriterText = styled.Text`
  font-family: 'hd-regular';
  color:#333;
  font-size:16px;
`;

const ArticleNumText = styled.Text`
  font-family: 'hd-regular';
  color:#666;
  font-size:12px;
`;