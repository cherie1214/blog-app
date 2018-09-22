import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions'  
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

const { height, width } = Dimensions.get("window");

class ToggleLike extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLiked: this.props.isLiked,
    }
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(_id) {
    const header = {
        headers : {
            'x-access-token' : this.props.login.token,
        }
    }
    if(!this.props.login.token){
      alert("'좋아요'는 로그인 후 이용해 주세요.")
      return false;
    }
    axios.post(domain + '/api/article/toggleLike', {_id}, header)
    .then((res) => {
        if(res.data.status === 'LIKE_TOGGLE_SUCCESSED'){
          if(res.data.addAction){
            this.props.setLikeIcon(true);
          }
          this.setState({
            ...this.state,
            isLiked : res.data.like,
          })
        }
    });
  }

  render(){  
    const { isLiked } = this.state;
    const { iconSize, numSize, _id, login } = this.props;

    return(
      <LikeBox>
        {isLiked && isLiked.indexOf(login.nickname) != -1 ? (
          <BtnLike onPress={()=>{this.handleLike(_id)}}>
            <Ionicons name="md-heart" color="#EC4568" size={iconSize} />
            <LikeNum size={numSize}>{isLiked.length}</LikeNum>
          </BtnLike>
          ) : (
          <BtnLike onPress={()=>{this.handleLike(_id)}}>
            <Ionicons name="md-heart-outline" color="#fff" size={iconSize}/>
            <LikeNum size={numSize}>{isLiked.length}</LikeNum>
          </BtnLike>
        )}
      </LikeBox>
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

export default connect(mapStateToProps, mapDispatchToProps)(ToggleLike);


const LikeBox = styled.View`
  flex-direction: row;
`;

const BtnLike = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

const LikeNum = styled.Text`
  font-family: 'hd-regular';
  margin-left:3px;
  color:#fff;
  font-size:${props => props.size}px;
  font-weight:500;
`;