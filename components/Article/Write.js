import React, { Component } from 'react';
import { Dimensions, StatusBar, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestSaveArticle } from '../../actions';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import WriteCon from './WriteCon';

const { height, width } = Dimensions.get("window");


class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
        article: null,
        dialogVisible: false,
    };
  }
  _handleState = (article) => {
      this.setState({
          article
      });
  }

  componentDidUpdate(prevProps){
    const http = this.props.http;
    if(prevProps.http !== http){  
      if(http.status === "SUCCESS"){
        this.setState({dialogVisible: true})
      }
    }    
  }

  render(){  
    const article = this.state.article; 
    const token = this.props.login.token;
    const http = this.props.http.status;

    return(
        <Wrap>
          <StatusBar hidden={true} />
          <HeaderBox>
            <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>글 쓰기</H1>
            <BtnSave 
              title="저장" 
              onPress={()=>{this.props.requestSaveArticle(article, token)}}
              />
            <ConfirmDialog
              title="글이 저장 되었습니다."
              message="글 목록에서 확인하시겠습니까?"
              visible={this.state.dialogVisible}
              onTouchOutside={() => this.setState({dialogVisible: false})}
              positiveButton={{
                  title: "YES",
                  onPress: () => this.props.navigation.navigate('Edit')
              }}
              negativeButton={{
                  title: "NO",
                  onPress: () => this.setState({dialogVisible: false}) 
              }}
              />    
          </HeaderBox>
          {/* <ScrollView> */}
            <ConBox>           
              {/* <Text>{http}</Text> */}
              <WriteCon handleState={this._handleState} />
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
          if(article === null) {
            alert("내용을 입력해 주세요.")
            return false;
          }
          return dispatch(requestSaveArticle(article, token));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);

const Wrap = styled.View`
  flex: 1;
  margin-top:7%;
  margin-bottom:-7%;
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

