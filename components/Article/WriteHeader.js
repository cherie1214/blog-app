import React, { Component } from 'react';
import { Dimensions, StatusBar, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestSaveArticle, articleInit, setNotifyIcon } from '../../actions';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { withNavigation } from 'react-navigation';
import { newBgPhoto } from '../../lib/postPicture';

const { height, width } = Dimensions.get("window");


class WriteHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
        saveConfirmVisible: false,
        backConfirmVisible: false,
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.http !== this.props.http) {
        if(this.props.http.status === "SUCCESS" || this.props.http.status === "UPDATED") {
          
          this.props.handleState({
            ...this.props.article,
            _id : this.props.http.result
          });
          
          this.props.articleInit();
          this.setState({
            saveConfirmVisible : true,
          });

          this.props.setNotifyIcon(true);
        }else if(this.props.http.result === "FAILED"){
            alert("저장 실패");
        }
    }
}

  handleBack = () => {
    this.setState({ backConfirmVisible: true })
  }

  handleBackYes = (_editId) => {
    _editId === "new" 
    ? this.props.navigation.goBack(null) 
    : this.props.navigation.navigate('Edit')
  }

  async saveArticle() {
    const article = this.props.article;
    const token = this.props.login.token;
    
    if(article.selectedImg && article.selectedImg[0]){
      const post = newBgPhoto(article.selectedImg[0], token);
      post.then(res => res.json())
      .then(data => {
          if(data.result !== 'SUCCESS'){
              alert("File upload Error");
              return false;
          }
          const toUploadObj = { ...article, bg : {...article.bg, photo : data.url} };
          this.props.requestSaveArticle(toUploadObj, token);
      });
    }else{
        this.props.requestSaveArticle(article, token);
    }
  }

  render(){  
    const { article, _editId } = this.props;
    const token = this.props.login.token;   
    const backConfirmMsg = `작성 중인 내용을` + String.fromCharCode(13) + `저장하지 않고 나가시겠습니까?`;

    return(
      <HeaderBox>
        <BtnIcon onPress={() => this.handleBack()}>
          <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
        </BtnIcon>
        <ConfirmDialog
          title="글 쓰기를 취소합니다."
          message={backConfirmMsg}
          visible={this.state.backConfirmVisible}
          positiveButton={{
              title: "네",
              onPress: () => {
                this.setState({backConfirmVisible: false})
                this.handleBackYes(_editId)
              }
          }}
          negativeButton={{
              title: "아니오",
              onPress: () => this.setState({backConfirmVisible: false}) 
          }}
          />     
        <H1>{_editId === "new" ? "글 쓰기" : "글 수정"}</H1>
        <BtnSave 
          title="저장" 
          onPress={() => this.saveArticle()}
          />
        <ConfirmDialog
          title="글이 저장 되었습니다."
          message="글 목록에서 확인하시겠습니까?"
          visible={this.state.saveConfirmVisible}
          positiveButton={{
              title: "네",
              onPress: () => {
                this.setState({saveConfirmVisible: false})
                this.props.navigation.navigate('Edit') 
              }
          }}
          negativeButton={{
              title: "아니오",
              onPress: () => this.setState({saveConfirmVisible: false}) 
          }}
          />    
      </HeaderBox>
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
      },
      setNotifyIcon: (bool) => {
        return dispatch(setNotifyIcon(bool));
      }
  };
};

const WriteHeaderWithNavigation = withNavigation(WriteHeader)
export default connect(mapStateToProps, mapDispatchToProps)(WriteHeaderWithNavigation);

const HeaderBox = styled.View`
  z-index:100;
  position: relative;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#ccc;
  border-bottom-width: 1px;
  background: #fff;
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


