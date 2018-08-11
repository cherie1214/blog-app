import React, { Component } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestSaveArticle } from '../../actions';


import EditItem from './EditItem';

const { height, width } = Dimensions.get("window");

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }

  render(){

    const http = this.props.http.status;

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
              <Text>{http}</Text>
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

const mapDispatchToProps = (dispatch) => {
  return {
      requestSaveArticle : (article, token) => {
          return dispatch(requestSaveArticle(article, token));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);


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