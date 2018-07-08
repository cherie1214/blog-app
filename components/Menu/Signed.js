import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class SignedMenu extends Component {
  
  render() {
    return (
      <Wrap>
        {/*StatusBar hidden={true} />*/}
       <CloseBox>
          <BtnClose onPressOut={() => this.props.props.navigation.closeDrawer()}>
            <Ionicons name="ios-close" color="#333" size={50} style={{marginRight:15}}/>
          </BtnClose>
        </CloseBox>
        <ProfileBox onPressOut={() => this.props.props.navigation.navigate('Mypage')}>
          <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
          <UserNickname>bonobono</UserNickname>
        </ProfileBox>
        <BorderBox></BorderBox>
        <BtnBox>
          <Button onPressOut={() => this.props.props.navigation.navigate('Write')}>
            <BtnText>글 쓰기</BtnText>
          </Button>
          <Button onPressOut={() => this.props.props.navigation.navigate('Edit')}>
            <BtnText>글 관리</BtnText>
          </Button>
        </BtnBox>
        <IconBox>
          <IconBtn onPressOut={() => this.props.props.navigation.navigate('Notify')}>
            <IconNew yellow></IconNew>
            <MaterialCommunityIcons name="bell-outline" color="#fff" size={30} />
          </IconBtn>
          <IconBtn onPressOut={() => this.props.props.navigation.navigate('Like')}>
            <IconNew pink></IconNew>
            <MaterialCommunityIcons name="heart-outline" color="#fff" size={30} style={{marginTop:5}}/>
          </IconBtn>
        </IconBox>
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

const ProfileBox = styled.TouchableOpacity`
  flex: 3;
  flex-direction: column;
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
  flex: 4;
  margin-top:20%;
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

const IconBox = styled.View`
  flex: 4;
  flex-direction:row;
  justify-content: center;
`;

const IconBtn = styled.TouchableOpacity`
  margin: 0 8px;
  width:60px;
  height:60px;
  border-radius:30px;
  justify-content: center;
  align-items: center;
  background: #ccc;
`;


const IconNew = styled.View`
  position: absolute;
  top:0; 
  right:0;
  width:18px;
  height:18px;
  border-radius:9px;
  background-color: ${props => {
        if(props.yellow){
          return `#FFCD19`
        } else if(props.pink){
          return `#EF3774`
        }
    }}
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

