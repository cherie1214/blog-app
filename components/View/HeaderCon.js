import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class HeaderCon extends Component {
  render(){
    return(
        <Wrap>
          <ConBox>
            <WeatherBox>
              <MaterialCommunityIcons name="weather-sunny" color="#fff" size={22} style={{marginLeft:3, marginRight:3}}/>
              <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={22} style={{marginLeft:3, marginRight:3}} />
            </WeatherBox>
            <DateBox>
              <DateText>2018.01.01 - 2018.01.01</DateText>
            </DateBox>
            <TitBox>
              <TitText>45일동안 서유럽 한바퀴, 45days in Wetern Europe</TitText>
              <BorderBox></BorderBox>
            </TitBox>
          </ConBox>
          <WriterBox>
            <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
            <WriterNickname>bonobono</WriterNickname>
          </WriterBox>  
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  background: #5ED9FF;
`;

const ConBox = styled.View`
  padding: 3% 7% 0;
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DateBox = styled.View`
  margin: 7% 0 5%;
`;

const DateText = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
  font-weight:500;
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
  width: ${width};
  bottom: -10px;
  margin-top:5px;
  height:5px;
  border-bottom-width: 5px;
  border-bottom-color: #efefef;
`;

  
const WriterBox = styled.TouchableOpacity`
  padding: 12% 7% 8%;
  flex-direction: row;
  align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:17px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 40px;
    height : 40px;
    border-radius : 20px;
    margin-right : 7px;
    background-color : transparent;
`;