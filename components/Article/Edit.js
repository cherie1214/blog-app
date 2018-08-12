import React, { Component } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestGetArticle } from '../../actions';
import axios from 'axios';


import EditItem from './EditItem';

const { height, width } = Dimensions.get("window");

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: "",
    }
  }

  componentDidMount(){
    const obj = {
      id: this.props.login.id,
      includePublish: true
    };

    axios.post('http://localhost:8000/api/article/getArticles', obj)
      .then((res) => {
          if(res.data.status === "ARTICLE_GET_FAILED"){
              alert("ERROR\n"+res.data.message);
          }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){  
            // alert(JSON.stringify(res.data,0,2))
          }
      }).catch((error) => {
        alert(error)
      });
  }

  componentDidUpdate(prevProps){
    const http = this.props.http;
    if(prevProps.http !== http){  
      if(http.status === "SUCCESS"){
        this.setState({ status: "SUCCESS" })
      }
    }    
  }

  render(){

    const http = this.props.http.status;
    const objArr = this.state.obj;
    const obj = JSON.stringify(objArr,0,2)

    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>글 관리</H1>
          </HeaderBox>
          <ScrollView>
            <ConBox>
              <Text>http: {http} / status:{this.state.status}</Text>
              <EditItem />
              <EditItem />
            </ConBox>
          </ScrollView>
        </Wrap>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.redux.auth.login,
    article: state.redux.article,
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
  flex:10;
  padding: 7%;
`;