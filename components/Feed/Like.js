import React, { Component } from 'react'
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { domain } from '../../config'

import LikeItem from './LikeItem';

const { height, width } = Dimensions.get("window");

class Like extends Component {
  constructor(props){
    super(props);
    this.state = {
      likes: {},
      message: null,
    }
  }

  intervalHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getLikeList();
    this.intervalHandler = setInterval(()=>{
      this.getLikeList();
    },10000);
  }

  getLikeList() {
    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    axios.post(domain + '/api/feed/getFeeds', {feedType: "like"}, header)
    .then((res) => {
      if(res.data.status === "FEED_GET_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "FEED_GET_SUCCESSED"){ 
          const likes = res.data.data;

          let newState = {
            likes
          }

          if(Object.keys(likes).length === 0){
            newState.message = "좋아요가 아직 없습니다.";
            newState.loading = false;
          } else newState.message = ""; 

          this.setState(newState)
        }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }

  _getItemList() {
    if(Object.keys(this.state.likes).length === 0) return '';
    let indents = [];
    Object.values(this.state.likes).forEach((e,i)=>{
        indents.push(<LikeItem key={i} {...e} />);
    });
    return indents;
  }

  componentWillUnmount () {
    clearInterval(this.intervalHandler);

    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    axios.post(domain + '/api/feed/confirmFeed', {feedType: "like"}, header)
    .then((res) => {

      if(res.data.status === "FEED_CONFIRM_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "FEED_CONFIRM_SUCCESSED"){ 
        this.props.setLikeIcon(false);
      }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }
  
  render(){
    const { likes, message } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>좋아요</H1>
          </HeaderBox>
          <ScrollView>
            <ConBox>
            {Object.keys(likes).length === 0 
                ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
                : this._getItemList()
              }
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    items: state.redux.article.items,
    http: state.redux.article.http,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLikeIcon : (bool) => {
      return dispatch(setLikeIcon(bool));
    },
  };
}

const likeWithNavigation = withNavigation(Like)
export default connect(mapStateToProps, mapDispatchToProps)(likeWithNavigation);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
`;

const BtnIcon = styled.TouchableOpacity`
`;

const H1 = styled.Text`
  z-index:-1;
  position:absolute;
  width: ${width};
  align-items: center;
  text-align:center;
  font-size:20px;
  font-family: 'hd-regular';
`;

const ConBox = styled.View`
  flex: 8.8;
`;
const NoDataBox = styled.View`
  padding-top:7%;
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  color:#666;
  font-size:16px;
  font-family: 'hd-regular';
`;

