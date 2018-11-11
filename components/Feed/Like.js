import React, { Component } from 'react'
import { Dimensions, ScrollView, FlatList, ActivityIndicator, View } from 'react-native';
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
      loading: false,
      data: [],
      page: 1, 
      seed: 1, 
      endYn: false,
      error: null,
      refreshing: false,
      message: "로딩 중...",
    };
    this.getLikeList = this.getLikeList.bind(this);
  }

  intervalHandler = null;

  componentDidMount(){
    //enhancement > 새로운것만 가져오기
    this.getLikeList();
  }

  getLikeList() {
    const { page, seed, data } = this.state;

    const token = this.props.login.token;
    const header = {
      headers: {
        'x-access-token': token
      }
    }
        
    setTimeout(() => {
      axios.post(domain + '/api/feed/getFeeds', {feedType: "like", page, seed}, header)
      .then((res) => {
        if(res.data.status === "FEED_GET_FAILED"){
          alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "FEED_GET_SUCCESSED"){ 
            let newState = {
              data: page === 1 ? res.data.list : [...data, ...res.data.list],
              error: res.message || null,
              loading: false,
              refreshing: false,
              endYn : res.data.endYn
            }
            if(res.data.length == 0 ) {
                newState.message = "좋아요가 아직 없습니다.";
            }else newState.message = null;
      
            this.setState(newState);
          }
        }).catch((error) => {
          alert("ERROR\n"+res.data.message);
        });
    }, 100) 
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
 
  handleRefresh = () => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true,
      endYn: false,
    },()=>{
      this.getLikeList();
    });
  }

  handleLoadMore = () => {
    if (!this.state.loading && !this.state.endYn){
      this.setState({
        page : this.state.page + 1,
        loading : true
      },() => {
        this.getLikeList();
      });
    }
  }

  renderFooter = (
    <View
      style={{
        paddingVertical: 40,
        // borderTopWidth: 1,
        // borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  _keyExtractor = (item, index) => item._id;
  
  render(){
    const { data, refreshing, loading } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>좋아요</H1>
          </HeaderBox>
          <ConBox>
            {data.length === 0 
              ? (<Loading><ActivityIndicator animating size="large" /></Loading>)
              : 
              <FlatList
                data={data}
                renderItem={({item}) => <LikeItem data={item} key={item._id}/>}
                keyExtractor={this._keyExtractor}
                ListFooterComponent={loading ? this.renderFooter : null}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
              />
            }
          </ConBox>
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
  flex: 1;
`;

const Loading = styled.View`
  margin-top: 7%;
`;

