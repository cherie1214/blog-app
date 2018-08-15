import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
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
      items: [],
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
            this.setState({
              items: res.data.data,
            })
          }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
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
    const items = this.state.items;
    const list = items.map(
      ( item, index ) => {      
       return <EditItem key={index} {...item} />
      }
    );

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
            {items.length === 0 ? 
              (<NoDataBox>              
                <NoDataText>저장한 글이 없습니다.</NoDataText>
                <BtnText noData onPressOut={() => this.props.navigation.navigate('Write')}>
                  <LinkText>글 쓰러 가기</LinkText>
                  <Ionicons name="ios-arrow-round-forward" color="#6093E3" size={24} style={{marginLeft:10}}/>
                </BtnText>
              </NoDataBox>) 
              : list
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
