import React, { Component } from 'react'
import { Dimensions, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { domain } from '../../config';
import { debounce } from "debounce";

import LikeItem from './LikeItem';

const { height, width } = Dimensions.get("window");

class Like extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: {},
      listCount: 1,
      endYn: false,
      message: "로딩 중...",
    };
    this.getLikeList = this.getLikeList.bind(this);
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
        
    axios.post(domain + '/api/feed/getFeeds', {feedType: "like", listCount: this.state.listCount}, header)
    .then((res) => {
      if(res.data.status === "FEED_GET_FAILED"){
        alert("ERROR\n"+res.data.message);
      }else if(res.data.status === "FEED_GET_SUCCESSED"){ 
          const likes = res.data.data;
          const endYn = res.data.endYn;
          let newState = {...this.state}

          if(Object.keys(likes).length === 0){
            newState.message = "좋아요가 아직 없습니다.";
            newState.loading = false;
          } else newState.message = ""; 

          newState.dataSource = likes;
          newState.endYn = endYn;
          this.setState(newState)
        }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
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
  _onEndReached(){
    alert(this.state.endYn)
    if(!this.state.endYn)(debounce(() => {
      const listCount = ++this.state.listCount;
      this.setState({
        ...this.state,
        listCount
      },()=>{
        this.getLikeList();
        alert(this.state.listCount)
      })
    },500))();
  }

  _keyExtractor = (item, index) => item._id;
  
  render(){
    const { dataSource, message } = this.state;

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
            {Object.keys(dataSource).length === 0 
                ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
                : 
                <FlatList
                  data={dataSource}
                  renderItem={({item}) => <LikeItem data={item} key={item._id} />}
                  onEndReachedThreshold = {3}
                  keyExtractor={this._keyExtractor}
                  onMomentumScrollEnd={()=>{
                    if(this.shouldLoadMore = true){
                        //load datas
                      this._onEndReached();
                      this.shouldLoadMore = false;
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
    setLikeIcon : (bool) => {
      return dispatch(setLikeIcon(bool));
    },
  };
}

const likeWithNavigation = withNavigation(Like)
export default connect(mapStateToProps, mapDispatchToProps)(likeWithNavigation);

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

