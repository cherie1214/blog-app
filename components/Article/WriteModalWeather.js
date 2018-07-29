import React, { Component } from 'react';
import { Switch, TouchableHighlight, View, Text, TouchableOpacity, Dimensions, StatusBar, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';

const { height, width } = Dimensions.get("window");

const weatherOption = {
  opt1: {
    id: 1,
    label: "선택 안 함",
    iconName: "cloud-off-outline",
    iconColor: "transparent",
    isChecked: "false"
  },
  opt2: {
    id: 2,
    label: "Sunny",
    iconName: "weather-sunny",
    iconColor: "#333",
    isChecked: "false"
  },
  opt3: {
    id: 3,
    label: "Cloudy",
    iconName: "weather-cloudy",
    iconColor: "#333",
    isChecked: "false"
  },
  opt4: {
    id: 4,
    label: "Sunny &amp; Cloudy",
    iconName: "weather-partlycloudy",
    iconColor: "#333",
    isChecked: "false"
  },
  opt5: {
    id: 5,
    label: "Rainy",
    iconName: "weather-pouring",
    iconColor: "#333",
    isChecked: "false"
  },
  opt6: {
    id: 6,
    label: "Windy",
    iconName: "weather-windy",
    iconColor: "#333",
    isChecked: "false"
  },
  opt7: {
    id: 7,
    label: "Snowy",
    iconName: "weather-snowy",
    iconColor: "#333",
    isChecked: "false"
  },
  opt8: {
    id: 8,
    label: "fog",
    iconName: "weather-fog",
    iconColor: "#333",
    isChecked: "false"
  },
}

export default class ModalWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      switchOneday: false,
      startDate: this.props.parentState.startDate,
      finishDate: this.props.parentState.finishDate,
    }
  }

  

  render(){
    const parentState = this.props.parentState;

    return(
      <ModalWrap>
        <ModalHeader>
          <ModalTit>날씨 선택하기</ModalTit>
          {/* <Text>{JSON.stringify(this.state.isModalVisible)}</Text> */}
          <Button title="취소" onPress={this._toggleModal}/>
        </ModalHeader>
        <ModalRow>
          <ModalIconBox>
            
          </ModalIconBox>
          <ModalLabel>선택 안 함</ModalLabel>
          <ModalCheckBox>
            <Feather name="check" color="#666" size={30} />
          </ModalCheckBox>
        </ModalRow>
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalHeader = styled.View`
  padding: 10px 7%;
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
  position: relative;
  padding: 0 7%;
  height:60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const ModalIconBox = styled.View`
  width: 70px;
`;

const ModalLabel = styled.Text`
  color:#333;
  font-family: 'hd-regular';
  font-size:17px;
`;

const ModalCheckBox = styled.View`
  width: 30px;
  position:absolute;
  right:11%;
`;