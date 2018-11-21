import React, { Component } from 'react';
import { Switch, Dimensions } from 'react-native';
import styled from 'styled-components';
import DatePicker from 'react-native-datepicker';

const { height, width } = Dimensions.get("window");

export default class ModalDate extends Component {
  constructor(props){
    super(props);
    this.state = {
      switchOneday: this.props.parentState.switchOneday,
      startDate: this.props.parentState.startDate,
      finishDate:this.props.parentState.finishDate,
    }
  }

  render(){
    const {switchOneday} = this.props.parentState;
    const startDate = this.props.parentState.startDate ? this.props.parentState.startDate.split('T')[0] : null;
    const finishDate = this.props.parentState.finishDate ? this.props.parentState.finishDate.split('T')[0] : null;
    const today = new Date().toISOString().slice(0, 10);

    // const { switchOneday, startDate, finishDate } = this.state;
    // const date = new Date();
    // const yy = date.getFullYear();
    // const mm = ( '00' + (date.getMonth() + 1) ).substr(-2);
    // const dd = ( '00' + (date.getDate() ) ).substr(-2);
    // const today = yy + "." +  mm + "." + dd;

    return(
      <ModalWrap>
        <ModalRow>
          <ModalLabel>One Day Trip</ModalLabel>
          <Switch 
            value={switchOneday}
            onValueChange={(value) => {
              if(value){
                this.setState({switchOneday : true});
                this.props.handleDate(startDate, "remove", true);
              }else{
                this.setState({switchOneday : false});
                this.props.handleDate(null, null, false);
              }
            }}
            />
        </ModalRow>
        <ModalRow>
          <ModalLabel>{switchOneday ? "Date" : "Start"}</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={startDate}
            mode="date"
            placeholder={today}
            format="YYYY.MM.DD"
            maxDate={finishDate ? finishDate : today}
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
            onDateChange={(date) => {
              this.setState({startDate: date});
              this.props.handleDate(date, null, switchOneday);
            }}
          />
        </ModalRow>
        { !switchOneday ?
        <ModalRow>
          <ModalLabel>Finish</ModalLabel>
          <DatePicker
            style={{width: 200}}
            date={finishDate}
            mode="date"
            placeholder={today}
            format="YYYY.MM.DD"
            minDate={startDate ? startDate : "1900.01.01"}
            maxDate={today}
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
            onDateChange={(date) => {
              this.setState({finishDate: date});
              this.props.handleDate(null, date, switchOneday);
            }}
          />
        </ModalRow> : null
        }
      </ModalWrap>
    )
  }
}


const ModalWrap = styled.View`
  background-color: #fff;
`;

const ModalRow = styled.View`
  padding: 0 7%;
  height:60px;
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
