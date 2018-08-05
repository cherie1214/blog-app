import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class ModalWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      weatherOpt: [
        {
          id: 1,
          label: "선택 안 함",
          iconName: "cloud-off-outline",
          iconColor: "transparent",
          isChecked: true,
        },
        {
          id: 2,
          label: "Sunny",
          iconName: "weather-sunny",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 3,
          label: "Cloudy",
          iconName: "weather-cloudy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 4,
          label: "Sunny & Cloudy",
          iconName: "weather-partlycloudy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 5,
          label: "Rainy",
          iconName: "weather-pouring",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 6,
          label: "Windy",
          iconName: "weather-windy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 7,
          label: "Snowy",
          iconName: "weather-snowy",
          iconColor: "#333",
          isChecked: false,
        },
        {
          id: 8,
          label: "fog",
          iconName: "weather-fog",
          iconColor: "#333",
          isChecked: false,
        },
      ]
    };
    this._toggleCheck = this._toggleCheck.bind(this);     
  }

  _toggleCheck = (e) =>{
    // alert(e.label)
    let opts = this.state.weatherOpt;
    e.isChecked = !e.isChecked;
    this.setState({
      weatherOpt: opts,
    }) 

    if(e.id !== 1 ){
      opts[0].isChecked = false;
      this.setState({
        weatherOpt: opts,
      })
    }
    // if(e.id === 1 && e.isChecked){
    //   alert("1")
    //   //나머지 isChecked === false로...
    // }

  }

  render(){
    const parentState = this.props.parentState;
    const weatherOpt = this.state.weatherOpt;

    const weatherObj = weatherOpt.map (
      (e) => {
        return (
          <ModalRow key={e.id} onPress={() => this._toggleCheck(e)}>
            <ModalIconBox>
              <MaterialCommunityIcons name={e.iconName} size={25} color={e.iconColor} />
            </ModalIconBox>
            <ModalLabel>{e.label}</ModalLabel>
            <ModalCheckBox>
              {e.isChecked ? <Feather name="check" color="#666" size={30} /> : ``}              
            </ModalCheckBox>
          </ModalRow>
        )  
      }
    )

    return(
      <ModalWrap>
          {weatherObj}
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalRow = styled.TouchableOpacity`
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
  height: 30px;
  position:absolute;
  right:11%;
`;