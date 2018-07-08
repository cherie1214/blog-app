import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

export default class SignedMenu extends Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };
  
  render() {
    return (
      <Wrap>
        {/*StatusBar hidden={true} />*/}
        {/*<BtnClose onPressOut={() => this.props.navigation.closeDrawer()}>
          <Ionicons name="ios-close" color="#333" size={50} style={{marginLeft:15}} />
        </BtnClose>*/}
        <ProfileBox>
          <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
          <UserNickname>bonobono</UserNickname>
        </ProfileBox>
        <BorderBox></BorderBox>
        <BtnBox>
          <Button>
            <BtnText>글 쓰기</BtnText>
          </Button>
          <Button>
            <BtnText>글 관리</BtnText>
          </Button>
        </BtnBox>
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-top:30%;
`;

const BtnClose = styled.TouchableOpacity`

`;

const ProfileBox = styled.TouchableOpacity`
  flex-direction: column,
  align-items:center;
`;

const BorderBox = styled.View`
  margin-left:10%;
  margin-top:10px;
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const BtnBox = styled.View`
  margin-top:20%;
  justify-content: center;
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

const ProfileImgBox = styled.Image`
  margin-bottom:10px;
  width : 70px;
  height : 70px;
  border-radius : 35px;
  background-color : transparent;
`;

const UserNickname = styled.Text`
  font-family: 'hd-bold';
  color:#333;
  font-size:17px;
  font-weight:500;
`;

