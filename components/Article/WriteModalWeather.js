import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

class Option extends Component{
  render(){
    return(
      <ModalRow 
        onPress = { () => this.props.onClick() } activeOpacity = { 0.8 } >
        <ModalIconBox>
          {this.props.select.id === 1 ? (``) : (
            <MaterialCommunityIcons name={this.props.select.iconName} size={25} color="#333" />
          )}
        </ModalIconBox>
        <ModalLabel>{this.props.select.label}</ModalLabel>
        <ModalCheckBox>
          {this.props.select.id === this.props.selectedId ? <Feather name="check" color="#666" size={30} /> : ``}              
        </ModalCheckBox>
      </ModalRow>
    );
  }
}

export default class ModalWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      weatherOpt: [
        {
          id: 1,
          label: "선택 안 함",
          iconName: null,
          selected: true,
        },
        {
          id: 2,
          label: "Sunny",
          iconName: "weather-sunny",
          selected: false,
        },
        {
          id: 3,
          label: "Cloudy",
          iconName: "weather-cloudy",
          selected: false,
        },
        {
          id: 4,
          label: "Sunny & Cloudy",
          iconName: "weather-partlycloudy",
          selected: false,
        },
        {
          id: 5,
          label: "Rainy",
          iconName: "weather-pouring",
          selected: false,
        },
        {
          id: 6,
          label: "Windy",
          iconName: "weather-windy",
          selected: false,
        },
        {
          id: 7,
          label: "Snowy",
          iconName: "weather-snowy",
          selected: false,
        },
        {
          id: 8,
          label: "fog",
          iconName: "weather-fog",
          selected: false,
        },
      ],
      selectedId: this.props.parentState.weather.id,
    };  
  }
  
  _changeActiveOption(index){
    const id =  this.state.weatherOpt[index].id;
    const obj = (id !== 1) ? {
      id: id,
      name: this.state.weatherOpt[index].iconName,
    } : {
      id: 1,
      name: null,
    };

    this.state.weatherOpt.map(( opt ) => { 
      opt.selected = false; 
    });

    this.state.weatherOpt[index].selected = true;

    this.setState({ weatherOpt: this.state.weatherOpt }, () => {
        this.setState({ 
          selectedId: id,
        });
    });

    this.props.handleWeather(obj);
  }

  render(){
    return(
      <ModalWrap>
        {this.state.weatherOpt.map(( item, key ) => (
          <Option key = { key } select = { item } selectedId ={this.state.selectedId} onClick = { this._changeActiveOption.bind( this, key ) } />
        ))}
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