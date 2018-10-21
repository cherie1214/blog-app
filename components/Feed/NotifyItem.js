import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import timeAgo from '../../lib/timeAgo';

const { height, width } = Dimensions.get("window");

export default class NotifyItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      notifyType: this.props.data.notifyType,
    }
    this._renderStatusType = this._renderStatusType.bind(this);
  }
  
  _renderStatusType(){
    switch (this.state.notifyType) {
      case "new":   return "새로 저장";
      case "update": return "수정";
      case "delete":  return "삭제";
      case "publish":  return "발행";
      case "unpublish":  return "발행 취소";
  }
}

  render(){

    const { title, registedDate, confirmed } = this.props.data;

    return(
        <Wrap>
          <ConBox>
            <Tit>{title}</Tit>
            <Con>글이 {this._renderStatusType()} 되었습니다.</Con>
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
  flex: 1;
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
  background:#FFCD19;
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
