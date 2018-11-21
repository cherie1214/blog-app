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
          bg: {
            photo: null,
          },
          isModalVisible: false,
          modalType : '',
          cameraRollVisible: false,
          switchOneday: false,
          startDate: "",
          finishDate: "",
          title: null,
          text: null,
          weather: {
            id: 1,
            name: "",
          },
          bg : {
            photo : null,
            color : {
              id : 1,
              value : "#6B5ED1"
            }
          },
          selectedImg: null,
          delYn : false,
          published : false,
        },
        _editId: this.props.navigation.getParam('itemId','new'),
    };
  }

  componentDidMount(){
    const _editId = this.state._editId;

    if(_editId !== "new"){
      axios.post(domain + '/api/article/getEditArticle', {_editId})
      .then((res) => {
        if(res.data.status === "ARTICLE_GET_FAILED"){
          alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "ARTICLE_GET_SUCCESSED"){  
          // this.setState({article: res.data.data})
          const article = res.data.data;
            this.setState({
              ...this.state,
              article : {
                ...this.state.article,
                _id : article._id,
                startDate: article.startDate,
                finishDate: article.finishDate,
                title : article.title,
                text: article.text,
                weather : {
                  id : null,
                  name : article.weather
                },
                bg : {
                  photo : article.bgStyle.photoUrl,
                  color : {
                    id : null,
                    value : article.bgStyle.backgroundColor
                  }
                },
                delYn : article.delYn,
                published : article.published
              },
            })  
          }
      }).catch((error) => {
        alert("ERROR\n"+res.data.message);
      });
    }
  }

  _handleState = (article) => {
    this.setState({
        ...this.state,
        article
    });
  }

  _handleImage = (selectedImg) => {
    this.setState({
      ...this.state,
      article: {
        ...this.state.article,
        selectedImg
      }
    })
  }

  _ToggleModal = () => {
    this.setState({ 
      isModalVisible: false,
      modalType : '',
      cameraRollVisible: !this.state.cameraRollVisible,
    });
  };

  render(){  
    const { cameraRollVisible, article, _editId } = this.state;

    return(
      <Container>
      {!cameraRollVisible ? (
        <Wrap>
          <WriteHeader article={article} _editId={_editId} handleState={this._handleState} />
          <ConBox>           
            <WriteCon 
              article={article}
              _id={this.state.article._id}
              _editId={this.state._editId}
              handleState={this._handleState} 
              handleModal={this._ToggleModal}
              />
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

