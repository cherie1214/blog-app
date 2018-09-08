import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from "react-native-modal";
import { domain } from '../../config';
import saveFeed from '../../lib/saveFeed';

import EditItem from './EditItem';

const { height, width } = Dimensions.get("window");

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: {},
      loading: true,
      message: "로딩 중...",
      buttonShow: false,
      isModalVisible: false,
      _id: null,
    };
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleModal = this._handleModal.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
  }

  componentDidMount(){
    const obj = {
      id: this.props.login.id,
      includePublish: true
    };

    axios.post(domain + '/api/article/getArticles', obj)
      .then((res) => {
          if(res.data.status === "ARTICLE_GET_FAILED"){
              alert("ERROR\n"+res.data.message);
          }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){  
            
            const items = res.data.data;

            let newState = {
              items
            }

            if(Object.keys(items).length === 0){
              newState.message = "저장한 글이 없습니다.";
              newState.loading = false;
              newState.buttonShow = true;
            } else newState.message = ""; 

            this.setState(newState)
          }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
  }

  _handleUpdate(_id, obj, target){
    const token = this.props.login.token;  
    const objToUpdate = {
      ...obj,
      _id,
      changed: target,
    }

    const header = {
      headers : {
          'x-access-token' : token
      }
    }

    axios.post(domain + '/api/article/write', objToUpdate, header)
      .then((res) => {
          if(res.data.status === "ARTICLE_UPDATE_FAILED"){
              alert("ERROR\n"+"세이브 실패");
          }else if(res.data.status === "ARTICLE_UPDATE_SUCCESSED"){ 
            
            let newArticle = Object.assign({}, this.state.items)
            let newState = {};

            if (target === "published"){
              newArticle[res.data.article._id].published = res.data.article.published;

            } else if(target === "delYn"){              
              delete newArticle[res.data.article._id];

              if(Object.keys(newArticle).length === 0){
                newState.message = "저장한 글이 없습니다.";
                newState.buttonShow = true;
              }
            } 

            this.setState({
              ...this.state,
              items: newArticle,
              ...newState,
            })
          }
      }).catch((error) => {
        alert("ERROR\n"+"캐치에러");
      });
  }

  _getItemList () {
    if(Object.keys(this.state.items).length === 0) return '';
    var indents = [];
    Object.values(this.state.items).forEach((e, i) => {
      indents.push(<EditItem key={i} {...e}  handleUpdate={this._handleUpdate} handleModal={this._handleModal}/>);
    })

    return indents;
  }

  _renderModalContent = (_id) => (
    <ModalWrap>    
      <ModalSelect>
        <ModalOption first onPress={() => this.props.navigation.navigate("Write", {'itemId': _id})}>
          <ModalBtnText>수정</ModalBtnText>
        </ModalOption>
        <ModalOption onPress={() => {
          this._handleUpdate(_id, {delYn : true}, "delYn");
          this.setState({ isModalVisible: false });
         }}>
          <ModalBtnText red>삭제</ModalBtnText>
        </ModalOption>        
      </ModalSelect>
      <ModalCancle onPress={() => this.setState({ isModalVisible: false })}>  
        <ModalBtnText>취소</ModalBtnText>
      </ModalCancle>
    </ModalWrap>
  );

  _handleModal = (_id) => {
    this.setState({
        ...this.state,
        _id,
        isModalVisible : !this.state.isModalVisible
    });
  }

  render(){
    const { _id, items, message, buttonShow, isModalVisible} = this.state;
 
    return(
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent(_id)}
        </Modal>

        <HeaderBox>
          <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
          </BtnIcon>
          <H1>글 관리</H1>
        </HeaderBox>
        <ScrollView>
          <ConBox>
            {/* <Text>{JSON.stringify(items)}</Text> */}
            {/* <Text>{JSON.stringify(this.state._id)}</Text> */}
            {Object.keys(items).length === 0 
              ? (<NoDataBox><NoDataText>{message}</NoDataText></NoDataBox>)
              : this._getItemList()
            }
            {buttonShow ? 
              <NoDataBox>
                <BtnText noData onPressOut={() => this.props.navigation.navigate('Write')}>
                  <LinkText>글 쓰러 가기</LinkText>
                  <Ionicons name="ios-arrow-round-forward" color="#6093E3" size={24} style={{marginLeft:10}}/>
                </BtnText>
              </NoDataBox>
            : ''}     
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

export default connect(mapStateToProps)(Edit);


const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
`;

const HeaderBox = styled.View`
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
  padding: 7%;
  flex-direction: column;
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

const BtnText = styled.TouchableOpacity`
  margin-top:20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #6093E3;
`;

const LinkText = styled.Text`
  font-size:14px;
  color:#6093E3;
  font-family: 'hd-regular';
`;

const ModalWrap = styled.View`
  padding: 30px;
`;

const ModalSelect = styled.View`
  background: #fff;
  border-radius:15px;
`;

const ModalCancle = styled.TouchableOpacity`
  margin-top:15px;
  padding: 20px 0;
  align-items: center;
  background: #fff;
  border-radius:15px;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 20px 0;
  align-items: center;
  border-top-color:#ccc;
  border-top-width: ${props => props.first ? "0" : "1px"}
`;

const ModalBtnText = styled.Text`
  font-size:18px;
  color: ${props => props.red ? "red" : "blue"}
`;