import React, { Component } from 'react';
import { Animated, Dimensions, StatusBar, View, ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions'  
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from 'axios';
import { domain } from '../../config';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

class WriterView extends Component {
  constructor(props){
    super(props);
    this.state = {
      writer : {},
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      message : '로딩중',
      init : false,
      scrollY : new Animated.Value(0),
    }
  }
  
  componentDidMount(){
    this.getList();
  }

  getList() {
    const { page, seed, data } = this.state;

    axios.post(domain + '/api/article/getWriterList', {_id : this.props.navigation.getParam('writer_id'), page, seed})
    .then((res)=>{
      if(res.data.status === 'WRITER_GET_SUCCESSED'){
        let newState = {
          data: page === 1 ? res.data.list : [...data, ...res.data.list],
          error: res.data.message || null,
          loading: false,
          refreshing: false,
          endYn : res.data.endYn,
          init : true,
          writer : res.data.writer
        }
        if(res.data.length == 0 ) {
          newState.init = false;
          newState.message = "게시물이 없습니다.";
        }else newState.message = "";

        this.setState(newState);
      }else{
        alert('ERROR');
      }
    })
    .catch((err)=>{ alert("err")})
  }
 
  renderFooter = (
    <View
      style={{
        paddingTop: 20
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  handleLoadMore = () => {
    if (!this.state.loading && !this.state.endYn){
      this.setState({
        page : this.state.page + 1,
        loading : true
      },() => {
        this.getList();
      });
    }
  }

  handleRefresh = () => {
    this.setState({
      page : 1,
      seed : this.state.seed + 1,
      refreshing : true,
      endYn : false
    },()=>{
      this.getList();
    });
  }

  _keyExtractor = (item, index) => item._id;

  render(){  
    const { message, data, refreshing, loading, init, scrollY } = this.state;
    const { token, nickname } = this.props.login;
    const scale = scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange : [1.2, 1, 0.9, 0]
    });
    const scale2 = scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange : [1, 1, 0.9, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, 40, 50],
      outputRange : [1, 0.9, 0]
    });
    const _size = scrollY.interpolate({
      inputRange: [-100, 0, 40, 50],
      outputRange : [100, 100, 90, 0]
    });

    return(
        <Wrap>         
          <StatusBar hidden={false} />
          <FixedHeaderBox>
            <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
            </BtnIcon> 
          </FixedHeaderBox>
          <HeaderConBox>
            <ProfileBox>
              <Animated.Image style={{
                opacity,
                transform : [{scale}],
                height: _size,
                width : _size,
                borderRadius : 50,
                backgroundColor : "#ccc",
                borderWidth: 1,
                borderColor: "#e5e5e5"
              }} 
                source={{uri: this.state.writer.profileImg}}
              />
              <Nickname>{this.state.writer.nickname}</Nickname>
              <Animated.View style={{
                opacity, 
                transform : [{scale:scale2}],
                marginBottom: 10,
                }}>
                <ArticleNum>글수 {this.state.writer.articleLength}</ArticleNum>
              </Animated.View>
            </ProfileBox> 
          </HeaderConBox>
          <ConBox>
            {data.length === 0
                ? (<Loading><ActivityIndicator animating size="large" /></Loading>)
                : <FlatList
                    style={{flex:1, padding:'7%'}}
                    data={data} 
                    renderItem={({item}) => 
                      <WriterViewItem
                        {...item}
                        token={token}
                        nickname={nickname}
                      />
                    }
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={loading ? this.renderFooter : null}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                    onScroll={Animated.event([
                      { nativeEvent: { contentOffset: { y: scrollY } } },
                    ])}
                  />
              }
              {init ? <NoDataBox><NoDataText>{message}</NoDataText></NoDataBox> : null}
            </ConBox>
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeIcon : (bool) => {
        return dispatch(setLikeIcon(bool));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriterView);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const FixedHeaderBox = styled.View`
  position:absolute;
  left: 0;
  z-index:100;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;  
`;


const HeaderConBox = styled.View`
  position:relative;
  z-index:5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const ProfileBox = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Nickname = styled.Text`
  font-family: 'hd-bold';
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  font-family: 'hd-regular';
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
  flex: 1;
  background: #f7f7f7;
`;

const Loading = styled.View`
  margin-top : 7%;
`;

const NoDataBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  color:#666;
  font-size:16px;
  font-family: 'hd-regular';
`;