import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class CardItem extends Component {

  render() {
    return (
      <Wrap>
        <Box>
          <FlexBox flex2>
            <WeatherBox>
              <MaterialCommunityIcons name="weather-sunny" color="#fff" size={30} style={{marginLeft:3, marginRight:3}}/>
              <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={30} style={{marginLeft:3, marginRight:3}} />
            </WeatherBox>
            <DateBox>
              <DateText>2018.01.01 - 2018.01.01</DateText>
            </DateBox>
            <TitBox>
              <TitText>45days in Western Europe 45days in Western Europe 45days in Western Europe</TitText>
            </TitBox>
            <LikeBox>
              <Ionicons name="md-heart" color="#EC4568" size={16} />
              <Ionicons name="md-heart-outline" color="#fff" size={16} />
              <LikeNum>120</LikeNum>
            </LikeBox>
          </FlexBox>
          <FlexBox flexEnd>
            <WriterBox>
              <WriterNickname>nickname</WriterNickname>
            </WriterBox>
          </FlexBox>
        </Box>
      </Wrap>  
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const Box = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding:20px;
  width: ${width * 0.6};
  background: #1FBFEF;
  border-radius: 20px;
`;

const FlexBox = styled.View`
  flex: ${props => props.flex2 ? "2" : "1"}
  flex-direction: column;
  justify-content: ${props => props.flexEnd ? "flex-end" : "flex-start"}
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DateBox = styled.View`
  margin: 20px 0 10px;
`;

const TitBox = styled.View`
`;

const LikeBox = styled.View`
  margin-top:40px;
  flex-direction: row;
  justify-content: flex-end;
`;

const WriterBox = styled.View`
   flex-direction: row;
`;

const DateText = styled.Text`
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const TitText = styled.Text`
  color:#fff;
  font-size:20px;
  font-weight:600;
`;

const LikeNum = styled.Text`
  margin-left:5px;
  color:#fff;
  font-size:15px;
  font-weight:500;
`;

const WriterNickname = styled.Text`
  color:#fff;
  font-size:20px;
  font-weight:500;
`;

