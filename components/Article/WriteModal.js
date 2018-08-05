import React, { Component } from 'react';
import { Switch, TouchableHighlight, View, Text, TouchableOpacity, Dimensions, StatusBar, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components';
import { Foundation, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';

const { height, width } = Dimensions.get("window");


export default class ModalDatePicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      switchOneday: false,
      startDate: this.props.parentState.startDate,
      finishDate: this.props.parentState.finishDate,
    }
  }

  // _toggleModal = () => {
  //   this.setState({ isModalVisible: !this.state.isModalVisible });
  // }

  render(){
    const parentState = this.props.parentState;

    return(
      <ModalWrap>
        <ModalHeader>
          <ModalTit>날짜 선택하기</ModalTit>
          {/* <Text>{JSON.stringify(this.state.isModalVisible)}</Text> */}
          <Button title="취소" onPress={this._toggleModal}/>
        </ModalHeader>
        <ModalRow>
          <ModalLabel>One Day Trip</ModalLabel>
          <Switch 
            value={this.state.switchOneday}
            onValueChange={(value) => this.setState({switchOneday: value})}
            />
        </ModalRow>
        <ModalRow>
          <ModalLabel>Start</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={this.state.startDate}
            mode="date"
            placeholder="2018.08.01"
            format="YYYY.MM.DD"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={false}
            customStyles={{
              dateInput: {
                alignItems: 'flex-end',
                borderColor: '#fff',
              },
              dateText: {
                color:'#333',
                fontSize: 19,
                fontFamily: 'hd-bold',
              },
              placeholderText: {
                color:'#bbb',
                fontSize: 19,
                fontFamily: 'hd-bold',
              }
            }}
            onDateChange={(date) => {this.setState({startDate: date})}}
          />
        </ModalRow>
        <ModalRow>
          <ModalLabel>Finish</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={this.state.finishDate}
            mode="date"
            placeholder="2018.08.01"
            format="YYYY.MM.DD"
            confirmBtnText="확인"
            cancelBtnText="취소"
            showIcon={false}
            customStyles={{
              dateInput: {
                alignItems: 'flex-end',
                borderColor: '#fff',
              },
              dateText: {
                color:'#333',
                fontSize: 19,
                fontFamily: 'hd-bold',
              },
              placeholderText: {
                color:'#bbb',
                fontSize: 19,
                fontFamily: 'hd-bold',
              }
            }}
            onDateChange={(date) => {this.setState({finishDate: date})}}
          />
        </ModalRow>
      </ModalWrap>
    )
  }
}


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
