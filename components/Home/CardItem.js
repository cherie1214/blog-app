import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class CardItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLiked: false,
      likeCount: 120,
    }
  }

  _handleLikeStatus(isLiked){
    this.setState(function(prevState){
      if(isLiked) {
        return {isLiked:false, likeCount: prevState.likeCount -1}
      } else {
        return {isLiked:true, likeCount: prevState.likeCount +1}
      }
    });
  }
  
  render() {
    const { isLiked, likeCount } = this.state;
    
    return (
      <Wrap>
        <Box>
          <FlexBox flex2>
            <ViewLinkBox>
              <WeatherBox>
                <MaterialCommunityIcons name="weather-sunny" color="#fff" size={22} style={{marginLeft:3, marginRight:3}}/>
                <MaterialCommunityIcons name="weather-partlycloudy" color="#fff" size={22} style={{marginLeft:3, marginRight:3}} />
              </WeatherBox>
              <DateBox>
                <DateText>2018.01.01 - 2018.01.01</DateText>
              </DateBox>
              <TitBox>
                <TitText>45일동안 서유럽 한바퀴, 45days in Wetern Europe</TitText>
              </TitBox>
            </ViewLinkBox>
            <LikeBox>
              <BtnLike onPressOut={() => this._handleLikeStatus(isLiked)}>
                {isLiked ? (
                  <Ionicons name="md-heart" color="#EC4568" size={13} />
                  ) : (
                  <Ionicons name="md-heart-outline" color="#fff" size={13} />
                  )
                }
                <LikeNum>{likeCount}</LikeNum>
              </BtnLike>
            </LikeBox>
          </FlexBox>
          <FlexBox flexEnd>
            <WriterBox>
              <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
              <WriterNickname>bonobono</WriterNickname>
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
  width: ${width * 0.65};
  background: #5ED9FF;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16)
`;

const FlexBox = styled.View`
  flex: ${props => props.flex2 ? "2" : "1"}
  flex-direction: column;
  justify-content: ${props => props.flexEnd ? "flex-end" : "flex-start"}
`;

const ViewLinkBox = styled.TouchableOpacity`
`;

const WeatherBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DateBox = styled.View`
  margin: 10% 0 5%;
`;

const TitBox = styled.View`
`;

const LikeBox = styled.View`
  margin-top:20%;
  flex-direction: row;
  justify-content: flex-end;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const WriterBox = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;

const DateText = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const TitText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:20px;
  font-weight:600;
`;

const LikeNum = styled.Text`
  font-family: 'hd-regular';
  margin-left:3px;
  color:#fff;
  font-size:13px;
  font-weight:500;
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
    margin-right : 5px;
    background-color : transparent;
`;
