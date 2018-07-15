import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, StatusBar, ScrollView, StyleSheet } from 'react-native';
import styled, { css } from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

export default class WriterView extends Component {
  constructor(props){
    super(props);
    this.state = {
      writerNickname: "bonobono",
      articleNum: 3,
    }
  }

  render(){
    
    const { writerNickname, articleNum } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <ProfileBox>
              <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
              <Nickname>{writerNickname}</Nickname>
              <ArticleNum>글수 {articleNum}</ArticleNum>
            </ProfileBox> 
          </HeaderBox>
          <ScrollView>
            <ConBox>
              <WriterViewItem />
              <WriterViewItem />
              <WriterViewItem />
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
  position:relative;
  z-index:100;
  padding: 15px 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background: #fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.05);
`;

const BtnIcon = styled.TouchableOpacity`
  z-index:1;
  position:absolute;
  top:7%;
  left: 15px;
`;

const ProfileBox = styled.View`
  width: ${width};
  align-items: center;
  justify-content: center;
`;


const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : transparent;
`;

const Nickname = styled.Text`
  margin-top:15px;
  font-family: 'hd-bold';
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  margin-top:5px;  
  font-family: 'hd-regular';
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
  padding:7%;
`;
