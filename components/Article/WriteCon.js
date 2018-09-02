import React, { Component } from 'react';
import { View, Dimensions, Button, Text } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';
import ModalBg from './WriteModalBg';

const { height, width } = Dimensions.get("window");

export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: this.props._id,
      isModalVisible: false,
      modalType: "",
      switchOneday: false,
      startDate: "",
      finishDate: "",
      title: null,
      text: null,
      weather: {
        id: 1,
        name: "",
      },
      bg : {
        photo : null,
        color : {
          id : 1,
          value : "#6B5ED1"
        }
      },
      loaded : false
    };
    this._toggleModal = this._toggleModal.bind(this);
    this._renderModalType = this._renderModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
  }

  componentDidUpdate( prevProps, prevState) {
    if(prevProps._id !== this.state._id) {
      this.setState({
        ...this.state, 
        _id : this.props._id
      })
    }
    if(JSON.stringify(prevState) !== JSON.stringify(this.state)) this.props.handleState(this.state);
    // alert(JSON.stringify(prevState,0,2))
    if(this.props._editId !== "new" && !this.state.loaded){
      this.setState({
        ...this.state,
        _id: this.props._editId,
        startDate: this.props.article.startDate,
        finishDate: this.props.article.finishDate,
        title: this.props.article.title,
        text: this.props.article.text,
        weather: {
          ...this.state.weather,
          name: this.props.article.weather,
        },
        bg: {
          photo : this.props.article.bgStyle.photoUrl,
          color : {
            ...this.state.bg.color,
            value : this.props.article.bgStyle.backgroundColor,
          }
        },
        loaded : true,
        published: this.props.article.published,
        delYn: this.props.article.delYn,
      });
    }    
  }

  _handleDate = (startDate, finishDate, switchOneday) => {
    if(startDate){
      this.setState({
        startDate
      })
    }
    if(finishDate){
      this.setState({
        finishDate
      })
    }
    if(finishDate === "remove"){
      this.setState({
        finishDate : null
      });
    }
    switchOneday ? 
    this.setState({
      switchOneday : true
    })
    :this.setState({
      switchOneday : false
    });
  }

  _handleWeather = (value) => {
    this.setState({
      weather : value
    })
  }

  _handleBg = (value) => {
    this.setState({
      bg : value
    });
  }

  _toggleModal = (type) => {
    this.setState({ 
      isModalVisible: !this.state.isModalVisible, 
      modalType: type 
    });
  };

  _renderModalType(date, weather, bg){
      switch (this.state.modalType) {
        case "date":   return date;
        case "weather": return weather;
        case "bg":  return bg;
    }
  }

  _renderModalContent = () => (
    <View>    
      <ModalHeader>
        <ModalTit>
          {this._renderModalType("날짜", "날씨", "카드 배경")} 선택하기
        </ModalTit>
        <Button value="cancle" title="닫기" onPress={() => this._toggleModal('')}/>
      </ModalHeader>
      {this._renderModalType(
        <ModalDate parentState={this.state} handleDate={this._handleDate} />, 
        <ModalWeather parentState={this.state} handleWeather={this._handleWeather}/>,
        <ModalBg parentState={this.state} handleBg={this._handleBg}/>
      )} 
    </View>
  );
  
  render(){
    const { isModalVisible, startDate, finishDate, title, weather, bg, text } = this.state;

    return (
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent()}
        </Modal>

        <HeaderConBox background={!bg.photo ? bg.color.value : "transparent"}>
          <DateBox>
            <Select onPress={() => this._toggleModal("date")}>   
              <CommonText>날짜</CommonText>      
              <CommonText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Row> 
              <CommonText>제목</CommonText>
              <TitInput
                onChangeText={(title) => this.setState({title})}
                value={title}
                maxLength={45}
                autoFocus={true}
                selectionColor="#fff"
                placeholder="45이내로 입력해 주세요."
                multiline={true}   
                numberOfLines={2}
              />
             </Row> 
          </TitBox>
          <WeatherBox>
            <Select onPress={() => this._toggleModal("weather")}>
              <CommonText>날씨</CommonText>
              {weather.name ? 
                (<MaterialCommunityIcons name={weather.name} size={17} color="#fff" />)  : ''};
            </Select>
          </WeatherBox>
          <Row justifyEnd>
            <Btn onPress={() => this._toggleModal("bg")}>
              <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
            </Btn>
          </Row>
        </HeaderConBox>
        <TextareaBox>
          {/* <Text>{JSON.stringify(this.props.article,0,2)}</Text>
          <Text>{JSON.stringify(this.state,0,2)}</Text> */}
          <Textarea
            multiline={true}
            onChangeText={(text) => this.setState({text})}
            placeholder="당신의 여행은 어땠나요?"
            placeholderStyle={{color:"#999", fontSize:15}}
            value={text}/>
        </TextareaBox>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  flex: 1;
`;


const HeaderConBox = styled.View`
  padding: 7%; 
  background: ${props => props.background};
`;

const Select = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${props => props.justifyEnd ? "flex-end" : "flex-start"};
`;

const DateBox = styled.View`
`;

const CommonText = styled.Text`
  margin-right:10px;
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

const TitInput = styled.TextInput`
  padding:0;
  width: 90%;
  color: #fff;
  font-size:17px;
  font-family: 'hd-regular';
`;

const Btn = styled.TouchableOpacity`
`;

const TextareaBox = styled.View`
  flex: 1;
  padding:7%;
`;

const Textarea = styled.TextInput`
  color: #333;
  font-size:15px;
  font-family: 'hd-regular';
`;

const ModalHeader = styled.View`
  padding: 10px 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  background: #fff;
`
const ModalTit = styled.Text`
  color:#999;
  font-family: 'hd-regular';
  font-size:15px;
`;