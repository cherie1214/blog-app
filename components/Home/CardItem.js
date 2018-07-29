import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';

const { height, width } = Dimensions.get("window");

class CardItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: [],
    }
    this.props = props;
    this._carousel = {};
    this.init();
  }

  init(){
    this.state = {
      cardCon: [
        {
          bgStyle : {
            backgroundColor: "#1adeb8",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "45일동안 서유럽 한바퀴, 45days in Wetern Europe",
          isLiked: false,
          likeCount: 120,
          writtenDate: "9시간 전",
          profileImg: "https://image.fmkorea.com/files/attach/new/20180501/486616/909844983/1039257189/2761aa3169424351e01076f85b61ba45.jpeg",
          nickname: "bonobono"
        }, {
          bgStyle : {
            backgroundColor: "#5ED9FF",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "자전거 여행의 매력, 느림보 제주 여행",
          isLiked: false,
          likeCount: 80,
          writtenDate: "12시간 전",
          profileImg: "http://t1.daumcdn.net/friends/prod/editor/fe1fbe7c-4c82-446e-bc5c-f571d90b0ba9.jpg",
          nickname: "어피치"
        }, {
          bgStyle : {
            backgroundColor: "#ffd021",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "단 기간 여행이 만족스러웠던 아담한 동네, 블라디보스톡",
          isLiked: false,
          likeCount: 102,
          writtenDate: "18시간 전",
          profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KYrEEV1hf0hBxY-N7XqOK-8Csx-z0Wa_oZ9WcJEp9xVKVsgx",
          nickname: "바바파파"
        }, 
      ]
    };

    console.log("ThumbnailCarousel Props: ", this.props)
  }


  handleSnapToItem(index){
    console.log("snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)

    // const { bgStyle, weather, travelDate, title, isLiked, likeCount, writtenDate, profileImg, nickname } = this.state.cardCon;

    return (
      <ItemBox style={item.bgStyle}>
        <FlexBox flex2>
          <ViewLinkBox onPressOut={() => this.props.navigation.navigate('ArticleView')}>
            <WeatherBox>
              <MaterialCommunityIcons name={item.weather} color="#fff" size={22} style={{marginLeft:3, marginRight:3}}/>
            </WeatherBox>
            <DateBox>
              <DateText>{item.travelDate}</DateText>
            </DateBox>
            <TitBox>
              <TitText>{item.title}</TitText>
            </TitBox>
          </ViewLinkBox>
          <Row>
            <LikeBox>
              <BtnLike>
                {item.isLiked ? (
                  <Ionicons name="md-heart" color="#EC4568" size={13} />
                  ) : (
                  <Ionicons name="md-heart-outline" color="#fff" size={13} />
                  )
                }
                <LikeNum>{item.likeCount}</LikeNum>
              </BtnLike>
            </LikeBox>
            <WrittenDate> · {item.writtenDate}</WrittenDate>
          </Row>
        </FlexBox>
        <FlexBox flexEnd>
          <WriterBox onPressOut={() => this.props.navigation.navigate('WriterView')}>
            <ProfileImgBox source={{ uri: item.profileImg }} />
            <WriterNickname>{item.nickname}</WriterNickname>
          </WriterBox>
        </FlexBox>
      </ItemBox>
    );
  }

  
  render() {
    
    
    return (
      <Wrap>
        <Carousel
          ref={ (c) => { this._carousel = c; } }
          data={this.state.cardCon}
          inactiveSlideOpacity={0.3}
          inactiveSlideScale={0.7}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={width}
          itemWidth={width * 0.65}
          layout={'default'}
          firstItem={0}
        />
      </Wrap>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const CardItemWithNavigation = withNavigation(CardItem);
export default connect(mapStateToProps, mapDispatchToProps)(CardItemWithNavigation);

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const ItemBox = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-top:15px;
  padding:15px;
  flex: 0.95;
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

const DateText = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const TitBox = styled.View`
`;

const TitText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const Row = styled.View`
  margin-top:30px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LikeBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: 'hd-regular';
  margin-left:3px;
  color:#fff;
  font-size:13px;
  font-weight:500;
`;

const WrittenDate = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
`;

const WriterBox = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:15px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 40px;
    height : 40px;
    border-radius : 20px;
    margin-right : 7px;
    background-color : transparent;
`;


