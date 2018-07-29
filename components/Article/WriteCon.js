import React, { Component } from 'react';
import { Switch, TouchableHighlight, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';

const { height, width } = Dimensions.get("window");

export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      startDate: "",
      finishDate: "",
      test: "test",
    }
    this._toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
  }


  _renderModalContent = () => (
    <View>      
      {/* <ModalDate parentState={this.state} /> */}
      <ModalWeather parentState={this.state} />
    </View>
  );
  
  render(){
    const { isModalVisible, startDate, finishDate } = this.state;

    return (
      <Wrap>
        <Modal isVisible={isModalVisible} style={{
          justifyContent: 'flex-end',
          margin:0,
        }}>
          {this._renderModalContent()}
        </Modal>


        <HeaderConBox>
          <DateBox>
            <Select onPress={this._toggleModal}>
              <CommonText>날짜</CommonText>
              <CommonText>{startDate} - {finishDate}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Select> 
              <CommonText>제목</CommonText>
             </Select> 
          </TitBox>
          <WeatherBox onPress={this._toggleModal}>
            <Select>
              <CommonText>날씨</CommonText>
            </Select>
          </WeatherBox>
          <Row flexEnd>
            <Btn>
              <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
            </Btn>
          </Row>
        </HeaderConBox>
        
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  flex: 1;
`;


const HeaderConBox = styled.View`
  padding: 7%; 
  background:#5ED9FF;
`;

const Select = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.flexEnd ? "flex-end" : "flex-start"}
`;

const DateBox = styled.View`
`;

const CommonText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:17px;
  font-weight:500;
`;

const WeatherBox = styled.View`
  margin-bottom:25px;
`;

const TitBox = styled.View`
  margin: 25px 0;
`;

const TitText = styled.Text`
`;

const Btn = styled.TouchableOpacity`
`;

const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalHeader = styled.View`
  padding: 4% 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`
const ModalTit = styled.Text`
  color:#999;
  font-family: 'hd-regular';
  font-size:15px;
`;

const ModalRow = styled.View`
  padding: 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const ModalLabel = styled.Text`
  color:#333;
  font-family: 'hd-regular';
  font-size:17px;
`;
