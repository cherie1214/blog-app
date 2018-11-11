import React, { Component } from 'react';
import { Dimensions, View, FlatList, ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions'  
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

import ListItem from './ListItem';

const { height, width } = Dimensions.get("window");

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      endYn : false,
      error: null,
      refreshing: false,
      message : '로딩 중...',
      init : false
    };
    this.getList = this.getList.bind(this);
  }

  componentDidMount(){
    this.getList();
  }

  getList() {
    const { page, seed, data } = this.state;
    axios.post(domain + '/api/article/getAllList', {page, seed})
    .then((res)=>{
        if(res.data.status === 'ALL_ARTICLE_GET_SUCCESSED'){
          // alert(page)
          let newState = {
            data: page === 1 ? res.data.list : [...data, ...res.data.list],
            error: res.message || null,
            loading: false,
            refreshing: false,
            endYn : res.data.endYn,
            init : true
          }
          if(res.data.length == 0 ) {
              newState.init = false;
              newState.message = "게시물이 없습니다.";
          }else newState.message = null;
    
          this.setState(newState);
        }
    })
    .catch((err)=>{})
  }

  renderFooter = (
    <View
      style={{
        paddingVertical: 20,
        // borderTopWidth: 1,
        // borderColor: "#CED0CE"
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
      endYn: false,
    },()=>{
      this.getList();
    });
  }

  _keyExtractor = (item, index) => item._id;
  
  // _getItemList () {
  //   if(Object.keys(this.state.items).length === 0) return '';
  //   var indents = [];
  //   Object.values(this.state.items).forEach((e, i) => {
  //     indents.push(
  //     <ListItem 
  //       key={i} {...e} 
  //       token={this.props.login.token} 
  //       nickname={this.props.login.nickname} 
  //       setLikeIcon={this.props.setLikeIcon} 
  //       _handleLike={(_id) => {this.handleLike(_id)}}
  //       />);
  //   })

  //   return indents;
  // }

  render(){
    const { message, data, refreshing, loading, init } = this.state;

    return(
        <Wrap>
          <HeaderBox>
            <BtnBox>
              <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
              </BtnIcon>
            </BtnBox>
            <LogoBox>
              <Logo>Travel</Logo>
            </LogoBox>
          </HeaderBox>
          <ConBox>
            {data.length === 0
              ? (<Loading ><ActivityIndicator animating size="large" /></Loading>)
              : <FlatList
                  style={{padding: "7%"}}
                  data={data} 
                  renderItem={({item}) => <ListItem 
                    {...item}
                    token={this.props.login.token} 
                    nickname={this.props.login.nickname} 
                    setLikeIcon={this.props.setLikeIcon}
                    _handleLike={(_id)=>{this.handleLike(_id)}}
                  />}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  ListFooterComponent={loading ? this.renderFooter : null}
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                />
              }
              {!init ? <NoDataBox><NoDataText>{message}</NoDataText></NoDataBox> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(List);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:1;
  position: relative;
  flex-direction: row;
  align-items: center;
  height:85px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background:#fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.06);
`;

const BtnBox = styled.View`
  position:absolute;
  top:0;
  left:0;
  z-index: 5;
  padding: 0 15px;
  height:50px;
  align-items: center;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const LogoBox = styled.View`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 45px;
  color:#999;
`;

const ConBox = styled.View`
  flex:1;
  padding-bottom: 7%;
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
