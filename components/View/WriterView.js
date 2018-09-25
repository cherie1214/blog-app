import React, { Component } from 'react';
import { Dimensions, StatusBar, Text } from 'react-native';
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
      items: {},
      data: [],
      message: "로딩 중...",
    }
  }
  
  componentDidMount(){
    this.getList();
  }

  getList() {
    axios.post(domain + '/api/article/getWriterList', {_id : this.props.navigation.getParam('writer_id')})
    .then((res)=>{
        if(res.data.status === 'WRITER_GET_SUCCESSED'){
          this.setState({
              ...this.state,
              items: res.data.list,
              data: res.data.data,
          },()=>{
            // alert(JSON.stringify(this.state.data))
          });
        }
    })
    .catch((err)=>{})
  }

  renderFixedHeader() {
    return(
      <FixedHeaderBox>
        <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
          <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
        </BtnIcon> 
      </FixedHeaderBox>
    )
  }

  renderSticky(){
    return(
      <StickyBox>
        <Nickname style={{marginTop: 5}}>{this.state.data.nickname}</Nickname>
      </StickyBox>
    )
  }

  renderHeaderContent(){
    return(
      <HeaderConBox>
        <ProfileBox>
          <ProfileImgBox source={{uri: this.state.data.profileImg}} />
          <Nickname>{this.state.data.nickname}</Nickname>
          <ArticleNum>글수 {this.state.data.articleLength}</ArticleNum>
        </ProfileBox> 
      </HeaderConBox>
    )
  }

  _getItemList () {
    if(Object.keys(this.state.items).length === 0) return '';
    var indents = [];
    Object.values(this.state.items).forEach((e, i) => {
      indents.push(
        <WriterViewItem 
          key={i} {...e} 
          token={this.props.login.token} 
          nickname={this.props.login.nickname} 
          // setLikeIcon={this.props.setLikeIcon} 
          // _handleLike={(_id) => {this.handleLike(_id)}} 
          />);
    })

    return indents;
  }
 

  render(){  
    const { items, message } = this.state;

    return(
        <Wrap>         
          <StatusBar hidden={false} />
          <ParallaxScrollView
            style={{ flex: 1}}
            backgroundColor="transparent"
            contentBackgroundColor="#f7f7f7"
            stickyHeaderHeight={60}
            parallaxHeaderHeight={220}
            fadeOutForeground={true}
            // onChangeHeaderVisibility={() => {this.setState({headerVisibility})}}
            renderFixedHeader={() => this.renderFixedHeader()}
            renderStickyHeader={() => this.renderSticky()}
            renderForeground={() => this.renderHeaderContent()}
            >
            <ConBox>
              {/* <Text>{JSON.stringify(this.state.items)}</Text> */}
              {Object.keys(items).length === 0 
              ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
              : this._getItemList()
            }
            </ConBox>
          </ParallaxScrollView> 
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

const StickyBox = styled.View`
  position: relative;
  height:50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom-width:1px;
  border-bottom-color: #dedede;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.08);
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
  padding: 30px 0 20px;
  height:220px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
`;

const BtnIcon = styled.TouchableOpacity`  
`;

const ProfileBox = styled.View`
  width: ${width};
  align-items: center;
  justify-content: center;
`;


const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : #ccc;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const Nickname = styled.Text`
  margin-top:15px;
  font-family: 'hd-bold';
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  margin-top:5px;  
  font-family: 'hd-regular';
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
  padding:7%;
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