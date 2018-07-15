import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, StatusBar, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import styled, { css } from 'styled-components';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class EditItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      conText: `봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐`,
      isPulished: false,
      writtenDate: "9시간 전",
    }
  }

  _handlePublishing(isPulished){
    this.setState(function(prevState){
      if(isPulished) {
        return {isPulished:false}
      } else {
        return {isPulished:true}
      }
    });
  }
  
  
  render(){
    const { isPulished, conText, writtenDate } = this.state;
    
    return (
      <Wrap>  
        <ControlBox>
          <BtnPublishing onPressOut={() => this._handlePublishing(isPulished)} visual={isPulished}>
            <TextPublishing visual={isPulished}>{!isPulished ? ("발행") : ("발행 취소")}</TextPublishing>
          </BtnPublishing>
          <BtnEdit>
            <Entypo name="dots-three-vertical" color="#fff" size={20} />
          </BtnEdit>
        </ControlBox>
        <FirstRow>
          <DateBox>
            <DateText>2018.01.01 - 2018.01.01</DateText>
          </DateBox>
          <WeatherBox>
            <MaterialCommunityIcons name="weather-sunny" color="#fff" size={20} style={{marginLeft:3}}/>
            <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={20} style={{marginLeft:3}} />
          </WeatherBox>
        </FirstRow>
        <TitBox>
          <TitText>45일동안 서유럽 한바퀴, 45days in Wetern Europe</TitText>
          <BorderBox></BorderBox>
        </TitBox>
        <TextBox>
          <ConText numberOfLines={3}>{conText}</ConText>
        </TextBox>
        <WrittenDate>{writtenDate}</WrittenDate>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  padding: 7% 10%;
  margin-bottom:7%;
  background:#5ED9FF;
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
  color:#fff;
  font-size:14px;
  ${props => { if(!props.visual) return `color:#5ED9FF;` } }
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
