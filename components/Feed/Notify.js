import React, { Component } from 'react'
import { Dimensions, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setNotifyIcon } from '../../actions';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { domain } from '../../config'
import { debounce } from 'debounce';

import NotifyItem from './NotifyItem'

const { height, width } = Dimensions.get("window");

class Notify extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: {},
      listCount: 1,
      endYn: false,
      message: "로딩 중...",
    };
    this.getNotifyList = this.getNotifyList.bind(this);
  }

  inverterHandler = null;

  componentDidMount(){
    this.getNotifyList();
  }

  getNotifyList(){
    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    axios.post(domain + '/api/feed/getFeeds', {feedType: "notify", listCount: this.state.listCount}, header)
    .then((res) => {
      if(res.data.status === "FEED_GET_FAILED"){
        alert("ERROR\n"+res.data.message);
      } else if(res.data.status === "FEED_GET_SUCCESSED"){ 
          const notifies = res.data.data;
          const endYn = res.data.endYn;
          let newState = {...this.state}

          if(Object.keys(notifies).length === 0){
            newState.message = "저장한 글이 없습니다.";
            newState.loading = false;
          } else newState.message = ""; 

          newState.dataSource = notifies;
          newState.endYn = endYn;
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
        
    axios.post(domain + '/api/feed/confirmFeed', {feedType: "notify"}, header)
    .then((res) => {

      if(res.data.status === "FEED_CONFIRM_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "FEED_CONFIRM_SUCCESSED"){ 
        this.props.setNotifyIcon(false);
      }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }

  // _onEndReached(){
  //   alert("??")
  //   alert(this.state.endYn)
  //   if(!this.state.endYn)(debounce(() => {
  //     const listCount = ++this.state.listCount;
  //     this.setState({
  //       ...this.state,
  //       listCount
  //     },()=>{
  //       this.getNotifyList();
  //       alert(this.state.listCount)
  //     })
  //   },500))();
  // }
  
  _onEndReached(){
    alert("aa")
    if(!this.state.endYn)(debounce(()=>{
      const listCount = ++this.state.listCount;
      this.setState({
        ...this.state,
        listCount
      },()=>{
        this.getAlarmList();
        // alert(this.state.listCount)
      })
    },2000))();
  }

  // _keyExtractor = (item, index) => item._id;
  
  render(){
    const { dataSource, message, endYn } = this.state;

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
              {Object.keys(dataSource).length === 0 
                ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
                :
                <FlatList
                  data={dataSource}
                  renderItem={({item}) => <NotifyItem data={item} key={item._id}/>}
                  onEndReachedThreshold = {0.5}
                  keyExtractor={(item, index) => item._id}
                  onMomentumScrollEnd={()=>{
                    alert("aa")
                    if(!endYn){
                      //load datas
                      alert("end")
                      this._onEndReached();
                    }
                  }}
                />
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
  margin:8% 0 -5%;
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
  flex: 1;
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