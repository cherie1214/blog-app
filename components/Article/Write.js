import React, { Component } from 'react';
import { Dimensions, StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestSaveArticle, articleInit } from '../../actions';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { domain } from '../../config';

import WriteCon from './WriteCon';

const { height, width } = Dimensions.get("window");


class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
        article: {
          _id : null,
        },
        saveConfirmVisible: false,
        backConfirmVisible: false,
        _editId: this.props.navigation.getParam('itemId','new'),
    };
    this._handleState = this._handleState.bind(this);
  }

  _handleState = (article) => {
      this.setState({
          article
      });
  }

  componentDidMount(){
    const _editId = this.state._editId;

    if(_editId !== "new"){
      axios.post(domain + '/api/article/getEditArticle', {_editId})
      .then((res) => {
          if(res.data.status === "ARTICLE_GET_FAILED"){
              alert("ERROR\n"+res.data.message);
          }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){  
            this.setState({article: res.data.data})
          }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
    }
  }

  componentDidUpdate(prevProps){
    const http = this.props.http;

    if(prevProps.http !== http){  

      if(http.status === "SUCCESS"){
        this.props.articleInit();

        this.setState({ 
          saveConfirmVisible: true,
          article : {
            ...this.state.article,
            _id: this.props.http.result,
          }
        })
      }
    }    
  }

  handleBack = () => {
    this.setState({ backConfirmVisible: true })
  }
  handleBackYes = (_editId) => {
    _editId === "new" 
    ? this.props.navigation.navigate('Home') 
    : this.props.navigation.navigate('Edit')
  }

  render(){  
    const article = this.state.article; 
    const token = this.props.login.token;   
    const _editId = this.state._editId; 
    const backConfirmMsg = `작성 중인 내용을` + String.fromCharCode(13) + `저장하지 않고 나가시겠습니까?`;

    return(
        <Wrap>
          <StatusBar hidden={false} />
          <HeaderBox>
            <BtnIcon onPress={() => this.handleBack()}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <ConfirmDialog
              title="글 쓰기를 취소합니다."
              message={backConfirmMsg}
              visible={this.state.backConfirmVisible}
              // onTouchOutside={() => this.setState({backConfirmVisible: false})}
              positiveButton={{
                  title: "네",
                  onPress: () => this.handleBackYes(_editId)
              }}
              negativeButton={{
                  title: "아니오",
                  onPress: () => this.setState({backConfirmVisible: false}) 
              }}
              />     
            <H1>{_editId === "new" ? "글 쓰기" : "글 수정"}</H1>
            <BtnSave 
              title="저장" 
              onPress={()=>{this.props.requestSaveArticle(article, token)}}
              />
            <ConfirmDialog
              title="글이 저장 되었습니다."
              message="글 목록에서 확인하시겠습니까?"
              visible={this.state.saveConfirmVisible}
              // onTouchOutside={() => this.setState({saveConfirmVisible: false})}
              positiveButton={{
                  title: "네",
                  onPress: () => this.props.navigation.navigate('Edit') 
              }}
              negativeButton={{
                  title: "아니오",
                  onPress: () => this.setState({saveConfirmVisible: false}) 
              }}
              />    
          </HeaderBox>
          {/* <ScrollView> */}
            <ConBox>           
              {/* <Text>{JSON.stringify(_editId,0,2)}</Text>
              <Text>{JSON.stringify(article,0,2)}</Text> */}
              <WriteCon 
                handleState={this._handleState} 
                _id={this.state.article._id}
                article={article}
                _editId={this.state._editId} />
            </ConBox>
          {/* </ScrollView> */}
        </Wrap>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    http : state.redux.article.http,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      requestSaveArticle : (article, token) => {
          // if(article === null) {
          //   alert("내용을 입력해 주세요.")
          //   return false;
          // }
          // if(article.startDate === null || article.startDate === "") {
          //   alert("날짜를 입력해 주세요.")
          //   return false;
          // }
          // if(article.title === null || article.title === "") {
          //   alert("제목을 입력해 주세요.")
          //   return false;
          // }          
          return dispatch(requestSaveArticle(article, token));
      },
      articleInit: () => {
        return dispatch(articleInit());
      }
  };
};

const WriteWithNavigation = withNavigation(Write)
export default connect(mapStateToProps, mapDispatchToProps)(WriteWithNavigation);

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

const BtnSave = styled.Button`
`;

const ConBox = styled.View`
  flex:10;
`;

