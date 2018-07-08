import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>알림</H1>
          </HeaderBox>
          <Contents>
            <ConBox>
              <Tit>45days in Western Europe</Tit>
              <Con>이 발행 되었습니다.</Con>
              <TimeBox>
                <New></New>
                <Time>5초 전</Time>
              </TimeBox>
            </ConBox>
            <ConBox>
              <Tit>임시저장한 글 임시저장한 글</Tit>
              <Con>이 수정 되었습니다.</Con>
              <TimeBox>
                <Time>5시간 전</Time>
              </TimeBox>
            </ConBox>
            <ConBox>
              <Tit>임시저장한 글 임시저장한 글</Tit>
              <Con>이 저장 되었습니다.</Con>
              <TimeBox>
                <Time>3일 전</Time>
              </TimeBox>
            </ConBox>
          </Contents>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-top: 5%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  flex: 1.2;
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

const Contents = styled.View`
  flex: 8.8;
`;

const ConBox = styled.View`
  padding: 7% 5%;
  border-bottom-color:#ddd;
  border-bottom-width: 1px;
`;

const TimeBox = styled.View`
  margin-top:20px;
  flex-direction:row;
  justify-content: flex-end;
`;

const New = styled.View`
  width:14px;
  height:14px;
  margin-right:5px;
  border-radius: 7px;
  background:#FFCD19;
`;

const Tit = styled.Text`
  font-family: 'hd-bold';
  font-size:20px;
  color: #333;
`;

const Con = styled.Text`
  margin-top:4px;
  font-family: 'hd-regular';
  font-size:14px;
  color:#666;
`;

const Strong = styled.Text`
  font-family: 'hd-bold';
  font-size:14px;
  color:#666;
`;

const Time = styled.Text`
  font-family: 'hd-regular';
  font-size:14px;
  color:#999;
`;
