import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class EditItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      published: false,
    }
  }

  _handlePublishing = (published) => {
    this.setState({
      published: !published,
    })
  }
  
  
  render(){
    const { text, updatedDate, title, bgStyle, startDate, finishDate, weather } = this.props;
    const published = this.state.published;

    return (
      <Wrap background={!bgStyle.photoUrl ? bgStyle.backgroundColor : "transparent"}> 
        <Wrapper>
          <ControlBox>
            <BtnPublishing onPressOut={() => this._handlePublishing(published)} visual={published}>
              <TextPublishing visual={published} color={bgStyle.backgroundColor}>{!published ? ("발행") : ("발행 취소")}</TextPublishing>
            </BtnPublishing>
            <BtnEdit>
              <Entypo name="dots-three-vertical" color="#fff" size={20} />
            </BtnEdit>
          </ControlBox>
          <FirstRow>
            <DateBox>
              <DateText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</DateText>
            </DateBox>
            <WeatherBox>
              <MaterialCommunityIcons name={weather} color="#fff" size={20} style={{marginLeft:3}}/>
            </WeatherBox>
          </FirstRow>
          <TitBox>
            <TitText>{title}</TitText>
            <BorderBox></BorderBox>
          </TitBox>
          <TextBox>
            <ConText numberOfLines={3} autoCorrect={false}>{text}</ConText>
          </TextBox>
          <WrittenDate>{updatedDate}</WrittenDate>
        </Wrapper>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`  
  margin-bottom:7%;
  border-radius: 10px;
  background:${prop => prop.background}; 
`;

const Wrapper = styled.View`
  padding:7% 10%;
  flex-direction: column;
  justify-content: flex-start;
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
