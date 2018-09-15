import React, { Component } from 'react'
import { Dimensions, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setNotifyIcon } from '../../actions';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { domain } from '../../config'

import NotifyItem from './NotifyItem'

const { height, width } = Dimensions.get("window");

class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: {},
      loading: true,
      message: "로딩 중...",
    }
  }

  componentDidMount(){
    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    axios.post(domain + '/api/feed/getFeeds', {}, header)
    .then((res) => {
      if(res.data.status === "FEED_GET_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "FEED_GET_SUCCESSED"){ 
          const items = res.data.data;

          let newState = {
            items
          }

          if(Object.keys(items).length === 0){
            newState.message = "저장한 글이 없습니다.";
            newState.loading = false;
          } else newState.message = ""; 

          this.setState(newState)
        }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }

  componentWillUnmount(){
    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    axios.post(domain + '/api/feed/confirmNotify', {}, header)
    .then((res) => {

      if(res.data.status === "NOTIFY_CONFIRM_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "NOTIFY_CONFIRM_SUCCESSED"){ 
        this.props.setNotifyIcon(false);
      }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }

  _getItemList () {
    if(Object.keys(this.state.items).length === 0) return '';
    var indents = [];
    Object.values(this.state.items).forEach((e, i) => {
      indents.push(<NotifyItem key={i} {...e} />);
    })

    return indents;
  }
  
  render(){
    const { items, message } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>알림</H1>
          </HeaderBox>
          <ScrollView>
            <ConBox>
              {/* <Text>{JSON.stringify(this.state.items,0,2)}</Text> */}
              {Object.keys(items).length === 0 
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
    setNotifyIcon : (bool) => {
      return dispatch(setNotifyIcon(bool));
    },
  };
}

const notifyWithNavigation = withNavigation(Notify)
export default connect(mapStateToProps, mapDispatchToProps)(notifyWithNavigation);

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