import React, { Component } from 'react';
import { Dimensions, StatusBar, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { domain } from '../../config';

import WriteHeader from './WriteHeader';
import WriteCon from './WriteCon';
import CameraRoll from '../Photo/CameraRoll';

const { height, width } = Dimensions.get("window");


class Write extends Component {
  constructor(props){
    super(props);
    this.state = {
        article: {
          _id : null,
          isModalVisible: false,
          modalType : '',
          isCameraRollVisible: false,
        },
        _editId: this.props.navigation.getParam('itemId','new'),
    };
  }

  _handleState = (article) => {
      this.setState({
          ...this.state,
          article
      });
  }

  _ToggleModal = () => {
    this.setState({ 
      isModalVisible: false,
      modalType : '',
      isCameraRollVisible: !this.state.isCameraRollVisible,
    });
  };

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

  render(){  
    const { isCameraRollVisible, article, _editId } = this.state;

    return(
      <Container>
      {!isCameraRollVisible ? (
        <Wrap>
          <WriteHeader handleState={this._handleState} article={article} _editId={_editId}/>
          <ConBox>           
            <WriteCon 
              handleState={this._handleState} 
              handleModal={this._ToggleModal}
              article={article}
              _id={this.state.article._id}
              _editId={this.state._editId} />
          </ConBox>
        </Wrap>  
      ) : <CameraRoll handleClose={this._ToggleModal} handleImage={this._handleImage} />}
      </Container>
      )
  }
}

export default Write;

const Container = styled.View`
  flex: 1;
`;

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const ConBox = styled.View`
  flex:10;
`;

