import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';
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
            backgroundColor: "",
            photoUrl: "http://holotrip.co.kr/wp-content/uploads/2017/05/%EC%97%90%ED%8E%A01.jpg",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "45일동안 서유럽 한바퀴, 45days in Wetern Europe",
          text: "봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새",
          isLiked: false,
          likeCount: 120,
          updatedDate: "9시간 전",
          profileImg: "https://image.fmkorea.com/files/attach/new/20180501/486616/909844983/1039257189/2761aa3169424351e01076f85b61ba45.jpeg",
          nickname: "bonobono"
        }, {
          bgStyle : {
            backgroundColor: "#5CC5FA",
            photoUrl: "",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "자전거 여행의 매력, 느림보 제주 여행",
          text: "봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새",
          isLiked: false,
          likeCount: 80,
          updatedDate: "12시간 전",
          profileImg: "http://t1.daumcdn.net/friends/prod/editor/fe1fbe7c-4c82-446e-bc5c-f571d90b0ba9.jpg",
          nickname: "어피치"
        }, {
          bgStyle : {
            backgroundColor: "#ccc",
            photoUrl: null,
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "단 기간 여행이 만족스러웠던 아담한 동네, 블라디보스톡",
          text: "봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새",
          isLiked: false,
          likeCount: 102,
          updatedDate: "18시간 전",
          profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KYrEEV1hf0hBxY-N7XqOK-8Csx-z0Wa_oZ9WcJEp9xVKVsgx",
          nickname: "바바파파"
        }, {
          bgStyle : {
            backgroundColor: null,
            photoUrl: "https://travelblog.expedia.co.kr/wp-content/uploads/2017/01/170131_TBR.jpg",
          },
          weather: "weather-sunny",
          travelDate: "2018.01.01 - 2018.01.01",
          title: "단 기간 여행이 만족스러웠던 아담한 동네, 블라디보스톡",
          text: "봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새",
          isLiked: false,
          likeCount: 102,
          updatedDate: "18시간 전",
          profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KYrEEV1hf0hBxY-N7XqOK-8Csx-z0Wa_oZ9WcJEp9xVKVsgx",
          nickname: "바바파파"
        }, 
      ]
    };
  }

  handleSnapToItem(index){
  }

   _renderItem = ( {item, index} ) => {
    return (
      <ItemBox bg={item.bgStyle.photoUrl === null || item.bgStyle.photoUrl === "" ? 
        ( "background-color:" + item.bgStyle.backgroundColor) : null
        }>
        {item.bgStyle.backgroundColor === null || item.bgStyle.backgroundColor === "" ? (
          <BgBox>
            <BgImage source={{ uri: item.bgStyle.photoUrl }} />
            <BgMask></BgMask>
          </BgBox>
        ) : null }
        <FlexBox flex2>
          <ViewLinkBox onPressOut={() => this.props.navigation.navigate('ArticleView')}>
            <WeatherBox>
              <MaterialCommunityIcons name={item.weather} color="#fff" size={24} style={{marginLeft:3, marginRight:3}}/>
            </WeatherBox>
            <DateBox>
              <DateText>{item.travelDate}</DateText>
            </DateBox>
            <TxtBox>
              <TitText>{item.title}</TitText>
              <Border></Border>
              <ConText numberOfLines={2}>{item.text}</ConText>
            </TxtBox>
          </ViewLinkBox>
          <Row>
            <LikeBox>
              <BtnLike>
                {item.isLiked ? (
                  <Ionicons name="md-heart" color="#EC4568" size={15} />
                  ) : (
                  <Ionicons name="md-heart-outline" color="#fff" size={15} />
                  )
                }
                <LikeNum>{item.likeCount}</LikeNum>
              </BtnLike>
            </LikeBox>
            <UpdatedDate> · {item.updatedDate}</UpdatedDate>
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
          inactiveSlideScale={0.75}
          renderItem={this._renderItem.bind(this)}          
          sliderWidth={width}
          itemWidth={width * 0.7}
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
position:relative;
flex-direction: column;
justify-content: space-between;
margin-top:15px;
padding:20px 15px;
flex: 0.95;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16)
${prop => prop.bg}
`;

const BgBox = styled.View`
  flex: 1;
  overflow:hidden;
  position:absolute;
  top:0;
  bottom: 0;
  width: ${width * 0.7};
  border-radius: 10px;
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

const TxtBox = styled.View`
`;

const Border = styled.View`
  margin: 6% 0;
  width:20px;
  height:5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TitText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:20px;
  line-height:23px;
  font-weight:600;
`;

const ConText = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:15px;
  line-height:18px;
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
  font-size:14px;
  font-weight:500;
`;

const UpdatedDate = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:14px;
`;

const WriterBox = styled.TouchableOpacity`
   flex-direction: row;
   align-items: center;
`;

const WriterNickname = styled.Text`
  font-family: 'hd-bold';
  color:#fff;
  font-size:16px;
  font-weight:500;
`;

const ProfileImgBox = styled.Image`
    width : 40px;
    height : 40px;
    border-radius : 20px;
    margin-right : 7px;
    background-color : transparent;
`;


