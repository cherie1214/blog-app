import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, StatusBar, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import styled, { css } from 'styled-components';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");

class ListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      bgStyle : {
        backgroundColor: "#1adeb8",
        photoUrl: "http://img.insight.co.kr/static/2018/04/26/700/2mj61hb3b5kz181s70qd.jpg",
      },
      weather: "weather-sunny",
      travelDate: "2018.01.01 - 2018.01.01",
      title: "45일동안 서유럽 한바퀴, 45days in Wetern Europe",
      text: "봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새",
      isLiked: false,
      likeCount: 120,
      updatedDate: "9시간 전",
      profileImg: "https://image.fmkorea.com/files/attach/new/20180501/486616/909844983/1039257189/2761aa3169424351e01076f85b61ba45.jpeg",
      nickname: "bonobono"
    }
  }
  
  render(){
    const { title, text, startDate, finishDate, weather, bgStyle, updatedDate } = this.state;
    
    return (
      <Wrap background={bgStyle.backgroundColor}> 
        <FirstRow>
          <DateBox>
            <DateText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</DateText>
          </DateBox>
          <WeatherBox>
            <MaterialCommunityIcons name={weather.name} color="#fff" size={20} style={{marginLeft:3}}/>
          </WeatherBox>
        </FirstRow>
        <TitBox>
          <TitText>{title}</TitText>
          <BorderBox></BorderBox>
        </TitBox>
        <TextBox>
          <ConText numberOfLines={3}>{text}</ConText>
        </TextBox>
        <WrittenDate>{updatedDate}</WrittenDate>
      </Wrap>
    )
  }
}

export default withNavigation(ListItem);
    
const Wrap = styled.View`
  padding: 7% 10%;
  margin-bottom:7%;
  background:${prop => prop.background}; 
  border-radius: 10px;
`;


const ControlBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BtnPublishing = styled.TouchableOpacity`
  padding: 1px 10px 0;
  height:28px;
  align-items: center;
  justify-content: center;
  border:1px #fff solid;
  border-radius: 14px;
  background-color:transparent;
  ${props => { if(!props.visual) return `background-color:#fff;` } }
`
const TextPublishing = styled.Text`
  font-family: 'hd-regular';
  font-size:14px;
  color:${props => props.visual ? "#fff" : props.color } }
`;

const BtnEdit = styled.TouchableOpacity`
  margin-right:-10px;
`

const FirstRow = styled.View`
  margin: 10% 0 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateBox = styled.View`
  align-items: center;
`;

const DateText = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TitBox = styled.View`
  position:relative;
`;

const TitText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const BorderBox = styled.View`
  position:absolute;
  width: ${width * 0.774};
  bottom: -10px;
  margin-top:5px;
  height:5px;
  border-bottom-width: 5px;
  border-bottom-color: #efefef;
`;

const TextBox = styled.View`
  margin-top:12%;
  height:46px;
`;

const ConText = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:15px;
  line-height:22px;
`;

const WrittenDate = styled.Text`
  margin-top:15px;
  text-align:right;
  font-family: 'hd-regular';
  color:#fff;
  font-size:12px;
`;

const ModalWrap = styled.View`
  padding: 30px;
`;

const ModalSelect = styled.View`
  background: #fff;
  border-radius:15px;
`;

const ModalCancle = styled.TouchableOpacity`
  margin-top:15px;
  padding: 20px 0;
  align-items: center;
  background: #fff;
  border-radius:15px;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 20px 0;
  align-items: center;
  border-top-color:#ccc;
  border-top-width: ${props => props.first ? "0" : "1px"}
`;

const ModalBtnText = styled.Text`
  font-size:18px;
  color: ${props => props.red ? "red" : "blue"}
`;