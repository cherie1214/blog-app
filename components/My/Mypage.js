import React, { Component } from 'react'
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Ionicons, Feather, Foundation } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { signOut, changeNicknameRequest, changeProfileImgRequest, setNotifyIcon, setLikeIcon, clearLikeIconRepeat } from '../../actions';
import CameraRoll from '../Photo/CameraRoll';
import axios from 'axios';
import { domain } from '../../config';
import { newBgPhoto } from '../../lib/postPicture';

const { height, width } = Dimensions.get("window");

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      isCameraRollVisible: false,
      selectedImg: null,
      profileImg: this.props.login.profileImg,
    };
    this._handleImage = this._handleImage.bind(this);
  }
  
  _handleImage = (selectedImg) => {
    const { token, id, _id, nickname } = this.props.login;
    this.setState({
      ...this.state,
      selectedImg
    },() => {
      if(selectedImg && selectedImg[0]){
        const post = newBgPhoto(selectedImg[0], token);
        post.then(res => res.json())
        .then(data => {
          if(data.result !== 'SUCCESS'){
            alert("File upload Error");
            return false;
          }
          const toUploadObj = { 
            id: id,
            _id: _id,
            nickname : nickname,
            profileImg : data.url
          };
          this.props.changeProfileImgRequest(toUploadObj, token);
          this.setState({
            ...this.state,
            isCameraRollVisible : false
          })
        });
      }
    });
  }

  _closeCameraRoll = () => {
    this.setState({ isCameraRollVisible: !this.state.isCameraRollVisible })
  }

   _handleChangeNickname(isEditing){
    const data = {
      ...this.props.login,  
      nickname : this.state.nickname,
    }
    const token = this.props.auth.login.token;
    this.setState(function(prevState){
      if(isEditing) {
        if(data.nickname !== this.props.auth.login.nickname) this.props.changeNicknameRequest(data, token);
        return {isEditing:false}
      } else {
        return {isEditing:true}
      }
    });
  }
  
  componentDidUpdate(prevProps){
    const auth = this.props.auth;
    if(prevProps.auth !== auth){  
      if(auth.login.loggedIn === false){
        alert("로그아웃 되었습니다.");
        this.props.setNotifyIcon(false);
        this.props.setLikeIcon(false);
        this.props.clearLikeIconRepeat(this.props.login.token);
        this.props.navigation.navigate('Home');

      }
    }    
  }

  _toggleCamera = () => {
    this.setState({
      ...this.state,
      isCameraRollVisible: !this.state.isCameraRollVisible,
    })
  }

  
  render(){
    const { isEditing, isCameraRollVisible } = this.state;
    const auth = this.props.auth;
    const { profileImg } = this.props.login;
    
    return(
      <Container>
        {!isCameraRollVisible ? (      
          <Wrap>
            <HeaderBox>
              <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
              </BtnIcon>
              <H1>My Travel</H1>
            </HeaderBox>
            <Contents>
              <ProfileBox>
                <ImgBox>
                  <ProfileImgBox source={{ uri: profileImg }} />
                  <PhotoEditBtn onPress={() => this._toggleCamera()}>
                    <Feather name="camera" color="#fff" size={20}/>
                  </PhotoEditBtn>
                </ImgBox>
                <NicknameBox>
                {!isEditing ? (
                    <UserNickname>{auth.login.nickname}</UserNickname>
                    ) : (
                      <Input 
                        inputRef="NicknameInput"
                        value={this.props.auth.login.nickname}
                        placeholder={this.props.auth.login.nickname}
                        placeholderTextColor="#999"
                        autoFocus={true}
                        onChangeText={(nickname) => this.setState({nickname: nickname})}
                      />
                    )
                  }
                </NicknameBox>
                <BtnEdit onPress={() => this._handleChangeNickname(isEditing)}>
                  {!isEditing ? (
                    <Foundation name="pencil" color="#666" size={20} />
                  ) : (
                    <Feather name="check" color="#666" size={23} />
                  )}
                </BtnEdit>
              </ProfileBox>
              <BorderBox></BorderBox>
              <BtnBox>
                <Button borderType onPress={() => this.props.navigation.navigate('ChangePw')}>
                  <BtnText borderType>비밀번호 변경</BtnText>
                </Button>
                <Button onPress={() => this.props.signOut()}>
                  <BtnText>Sign Out</BtnText>
                </Button>
              </BtnBox>
            </Contents>
          </Wrap>
        ) : (
          <CameraRoll handleClose={this._closeCameraRoll} handleImage={this._handleImage} />
        )}  
      </Container>  
    )
  }
}




const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
    login: state.redux.auth.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      return dispatch(signOut());
    },
    changeNicknameRequest: (userInfo, token) => {
      return dispatch(changeNicknameRequest(userInfo, token));
    },
    changeProfileImgRequest: (userInfo, token) => {
      return dispatch(changeProfileImgRequest(userInfo, token));
    },
    setNotifyIcon: (bool) => {
      return dispatch(setNotifyIcon(bool));
    },
    setLikeIcon: (bool) => {
      return dispatch(setLikeIcon(bool));
    },
    clearLikeIconRepeat: (token) => {
      return dispatch(clearLikeIconRepeat(token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mypage);

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
  background: #fff;
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
  font-family: 'hd-bold';
`;

const Contents = styled.View`
  flex: 8.8;
`;

const ProfileBox = styled.View`
  margin-top:10%;
  flex-direction: column;
  align-items:center;
`;

const BorderBox = styled.View`
  margin-left:15%;
  margin-top:10px;
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const ImgBox = styled.View`
  flex-direction:row;
  position:relative;
`
const PhotoEditBtn = styled.TouchableOpacity`
  position:absolute;
  right:0;
  bottom:0;
  justify-content: center;
  align-items:center;
  width:40px;
  height:40px;
  border-radius:20px;
  background:#18B0A3;
`

const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : transparent;
`;

const NicknameBox  = styled.View`
  margin-top:35px;
  flex-direction: row;
  align-items: center;
`
const UserNickname = styled.Text`
  font-family: 'hd-bold';
  color:#333;
  font-size:17px;
  font-weight:500;
`;

const Input = styled.TextInput`
  font-family: 'hd-bold';
  color:#333;
  font-size:17px;
`;

const BtnEdit = styled.TouchableOpacity`
  position:absolute;
  right:20px; 
  bottom:0;
`;

const BtnBox = styled.View`
  margin-top:20%;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom:15px;
  width: ${width * 0.7};
  height: 50px;
  justify-content: center;
  align-items:center;
  border-radius:25px;
  background:#bbb;
  ${props =>{
    if(props.borderType){
      return `border: 1px #ccc solid; background-color:transparent;`
    }
  }}
`;

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: 16px;
  color:#fff;
  ${props =>{
    if(props.borderType){
      return `color:#999;`
    }
  }}
`;