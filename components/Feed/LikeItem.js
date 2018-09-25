import React, { Component } from 'react'
import { Dimensions, View } from 'react-native';
import styled from 'styled-components';
import timeAgo from '../../lib/timeAgo';

const { height, width } = Dimensions.get("window");

export default class LikeItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    const { title, registedDate, confirmed, likePersonName, likeLength } = this.props.data;

    return(
        <Wrap>
          <ConBox>
            <Tit>{title}</Tit>
            {likeLength === 1 ? (
              <View>
                <Con>을 <Strong>{likePersonName}</Strong> 회원님이 좋아합니다.</Con>
              </View>
            ) : (
              <View>
                <Con>을 <Strong>{likePersonName}</Strong> 회원님 <Strong>외 {likeLength}명</Strong>이 좋아합니다.</Con>
              </View>
            ) }
            <TimeBox>
            {confirmed ? null : <New></New>}
              <Time>{timeAgo(registedDate, true)}</Time>
            </TimeBox>
          </ConBox>
        </Wrap>
      )
  }
}

const Wrap = styled.View`
`;

const ConBox = styled.View`
  padding: 7% 5%;
  border-bottom-color:#ddd;
  border-bottom-width: 1px;
`;

const TimeBox = styled.View`
  margin-top:20px;
  flex-direction:row;
  justify-content: flex-end;
`;

const New = styled.View`
  width:14px;
  height:14px;
  margin-right:5px;
  border-radius: 7px;
  background:#EF3774;
`;

const Tit = styled.Text`
  font-family: 'hd-bold';
  font-size:18px;
  color: #333;
`;

const Con = styled.Text`
  margin-top:4px;
  font-family: 'hd-regular';
  font-size:14px;
  color:#666;
`;

const Strong = styled.Text`
  font-family: 'hd-bold';
  font-size:14px;
  color:#666;
`;

const Time = styled.Text`
  font-family: 'hd-regular';
  font-size:14px;
  color:#999;
`;
