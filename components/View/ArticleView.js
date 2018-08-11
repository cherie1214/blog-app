import React, { Component } from 'react';
import { Dimensions, StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import ArticleHeaderCon from './ArticleHeaderCon'

const { height, width } = Dimensions.get("window");



export default class ArticleView extends Component {
  constructor(props){
    super(props);
    this.state = {
      conText: `봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상 봄바람이다 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 천지는 얼마나 기쁘며 얼마나 아름다우냐? 이상 곧 만천하의 대중을 품에 안고 그들에게 밝은 길을 찾아 주며 그들을 행복스럽고 평화스러운 곳으로 인도하겠다는 커다란 이상을 품었기 때문이다 그러므로 그들은 길지 아니한 목숨을 사는가 싶이 살았으며 그들의 그림자는 천고에 사라지지 않는 것이다 이것은 현저하게 일월과 같은 예가 되려니와 그와 같지 석가는 무엇을 위하여 설산에서 고행을 하였으며 예수는 무엇을 위하여 광야에서 방황하였으며 공자는 무엇을 위하여 천하를 철환하였는가? 밥을 위하여서 옷을 위하여서 미인을 구하기 위하여서 그리하였는가? 아니다 그들은 커다란 이상`,
      isScrolling: false,
      isLiked: false,
      likeCount: 120,
      lastScrollPos: 0,
      writtenDate: "9시간 전",
    }
  }

  _handleLikeStatus(isLiked){
    this.setState(function(prevState){
      if(isLiked) {
        return {isLiked:false, likeCount: prevState.likeCount -1}
      } else {
        return {isLiked:true, likeCount: prevState.likeCount +1}
      }
    });
  }
  

  render(){
    
    const { isLiked, likeCount, conText, isScrolling, writtenDate } = this.state;

    return(
        <Wrap>
          <StatusBar hidden={true} />
          <HeaderBox visual={isScrolling}>
              <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color={isScrolling ? ("#333") : ("#fff")} size={45}/>
              </BtnIcon>
              <Row>
                <BtnLike onPressOut={() => this._handleLikeStatus(isLiked)}>
                  {isLiked ? (
                    <Ionicons name="md-heart" color="#EC4568" size={13} />
                    ) : (
                    <Ionicons name="md-heart-outline" color={isScrolling ? ("#333") : ("#fff")} size={13} />
                    )
                  }
                  <LikeNum visual={isScrolling}>{this.state.lastScrollPos}</LikeNum>
                </BtnLike>
                <WrittenDate> · {writtenDate}</WrittenDate>   
             </Row> 
          </HeaderBox>
          <ScrollView>  
            <HeaderConBox>
              <ArticleHeaderCon />
            </HeaderConBox>  
            <TextBox>
              <ConText>{conText}</ConText>
            </TextBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  position:relative;
`;

const HeaderBox = styled.View`
  z-index:100;
  padding: 20px 15px 0;
  height:70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: transparent;
  background: #5ED9FF;
  ${props => {
    if(props.visual){
      return `
        border-bottom-color: #dedede;
        background: #fff;
        box-shadow: 0px 3px 2px rgba(0,0,0,0.05);
      `
    }
  }}
`;

const BtnIcon = styled.TouchableOpacity`
`;

const Row = styled.View`
  flex-direction: row;
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
  font-size:13px;
  color: ${props => props.visual ? ('#333;') : ('#fff;')}
  font-weight:500;
`;

const WrittenDate = styled.Text`
  font-family: 'hd-regular';
  color:#fff;
  font-size:13px;
`;

const HeaderConBox = styled.View`
  flex: 5;
`;

const TextBox = styled.View`
  flex: 6;
  background: #fff;
`;

const ConText = styled.Text`
  padding: 7%;
  flex-wrap: wrap;
  font-family: 'hd-regular';
  color:#333;
  font-size:15px;
  line-height:25px;
`;

