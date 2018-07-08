import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class UnSignedMenu extends Component {
  render() {
    return (
      <Wrap>
        {/*StatusBar hidden={true} />*/}
        <CloseBox>
          <BtnClose>
            <Ionicons name="ios-close" color="#333" size={50} style={{marginRight:15}}/>
          </BtnClose>
        </CloseBox>
        <LogoBox>
          <Logo>Travel</Logo>
          <BorderBox></BorderBox>
        </LogoBox>
        <BtnBox>
          <Button>
            <BtnText>Begin My Travel</BtnText>
          </Button>
        </BtnBox>
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-top:15%;
`;

const CloseBox = styled.View`
  flex: 1.5;
  align-items: flex-end;
`;

const BtnClose = styled.TouchableOpacity`

`;

const LogoBox = styled.View`
  flex: 1.5;
  margin-left:10%;
`;

const BorderBox = styled.View`
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const BtnBox = styled.View`
  flex: 8;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom:15px;
  width:150px;
  height:44px;
  justify-content: center;
  align-items: center;
  border: 1px #ccc solid;
  border-radius: 22px;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 30px;
  color:#999;
`;

const BtnText = styled.Text`
  font-family: 'hd-regular';
  color:#333;
  font-size:15px;
`;