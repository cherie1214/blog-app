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
      loaded : false
    };
    this._toggleModal = this._toggleModal.bind(this);
    this._renderModalType = this._renderModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
    this._handleDate = this._handleDate.bind(this);
    this._handleBg = this._handleBg.bind(this);
    this._handleWeather = this._handleWeather.bind(this);
  }

  _handleDate = (startDate, finishDate, switchOneday) => {
    let obj = {
      ...this.props.article,
    };
    if(startDate){
      obj.startDate = startDate;
    }
    if(finishDate){
      obj.finishDate = finishDate;
    }
    if(finishDate === "remove"){
      obj.finishDate = null;
    }
    switchOneday 
    ? obj.switchOneday = true
    : obj.switchOneday = false
    this.props.handleState(obj);
  }

  _handleWeather = (value) => {
    const obj = {
      ...this.props.article,
      weather: {
        ...this.props.article.weather,
        ...value
      }
    }
    this.props.handleState(obj);
  }

  _handleBg = (value) => {
    const obj = {
      ...this.props.article,
      ...value
    }  
    this.props.handleState(obj);
  }

  _toggleModal = (type) => {
    this.props.handleState({ 
      ...this.props.article,
      isModalVisible: !this.props.article.isModalVisible,
      modalType: type 
    });
  };

  _renderModalType(date, weather, bg){
      switch (this.props.article.modalType) {
        case "date":   return date;
        case "weather": return weather;
        case "bg":  return bg;
    }
  }

  _renderModalContent = () => {
    const article = this.props.article;

    return(
      <View>    
        <ModalHeader>
          <ModalTit>
            {this._renderModalType("날짜", "날씨", "카드 배경")} 선택하기
          </ModalTit>
          <Button value="cancle" title="닫기" onPress={() => this._toggleModal('')}/>
        </ModalHeader>
        {this._renderModalType(
          <ModalDate parentState={article} handleDate={this._handleDate} />, 
          <ModalWeather parentState={article} handleWeather={this._handleWeather} />,
          <ModalBg article={article} handleBg={this._handleBg} handleCameraModal={this.props.handleModal} />
        )} 
      </View>
    )
  };
 
  render(){
    const article = this.props.article;
    const { startDate, finishDate, weather, bg, title, text, isModalVisible, selectedImg } = this.props.article;

    return (
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          onModalHide={this.modalHide}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent()}
        </Modal>

        <HeaderConBox bg={!selectedImg ? 
          ( "background-color:" + bg.color.value) : null }>
          {selectedImg ? (
            <BgBox>
              <BgImage source={{ uri: selectedImg[0].uri }} />
              <BgMask></BgMask>
            </BgBox>
          ) : null }
          <DateBox>
            <Select onPress={() => this._toggleModal("date")}>   
              <CommonText>날짜</CommonText>      
              <CommonText>{startDate ? startDate : null} {finishDate ? '- ' + finishDate : null}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Row> 
              <CommonText>제목</CommonText>
              <TitInput
                onChangeText={(text) => this.props.handleState({...article, title: text})}
                value={title}
                maxLength={45}
                autoCapitalize={"none"}
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
                (<MaterialCommunityIcons name={weather.name} size={17} color="#fff" />)  : null};
            </Select>
          </WeatherBox>
          <Row justifyEnd>
            <Btn onPress={() => this._toggleModal("bg")}>
              <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
            </Btn>
          </Row>
        </HeaderConBox>
        <TextareaBox>
          <Textarea
            onChangeText={(text) => this.props.handleState({...article,text})}
            multiline={true}
            placeholder="당신의 여행은 어땠나요?"
            placeholderStyle={{color:"#999", fontSize:15}}
            value={text}/>
        </TextareaBox>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  position:relative;
  flex: 1;
`;


const HeaderConBox = styled.View`
  padding: 7%; 
  ${prop => prop.bg}
`;

const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  bottom: 0;
  left:0;
  right:0;
`;

const BgImage = styled.Image`
  width: 100%;
  height:100%;
`;

const BgMask = styled.View`
  position:absolute;
  width: 100%;
  height:100%;
  backgroundColor: rgba(0,0,0,0.5);
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
