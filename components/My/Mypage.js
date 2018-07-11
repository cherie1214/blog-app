import React, { Component } from 'react'
import { CameraRoll, View, Text, TouchableOpacity, InputText, StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons, Feather, Foundation } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { requestLogout } from '../../actions';


const { height, width } = Dimensions.get("window");

class Mypage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      nickname: "bonobono",
    }
  }
  _handleCameraRoll = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };

   _handleChangeNickname(isEditing){
    this.setState(function(prevState){
      if(isEditing) {
        return {isEditing:false}
      } else {
        return {isEditing:true}
      }
    });
  }
  
  // _handleFocusInput(){
  //   this.inputRef[NicknameInput].inputRef.TextInput.focus();
  // }
  
  render(){
    const { isEditing } = this.state;
    
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>My Travel</H1>
          </HeaderBox>
          <Contents>
            <ProfileBox>
              <ImgBox>
                <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
                <PhotoEditBtn onPress={this._handleCameraRoll}>
                  <Feather name="camera" color="#fff" size={20}/>
                </PhotoEditBtn>
              </ImgBox>
              <NicknameBox>
               {!isEditing ? (
                   <UserNickname>{this.state.nickname}</UserNickname>
                   ) : (
                    <Input 
                      inputRef="NicknameInput"
                      value={this.state.nickname}
                      placeholder={this.state.nickname}
                      placeholderTextColor="#999"
                      onChangeText={(nickname) => this.setState({nickname: nickname})}
                    />
                   )
                }
              </NicknameBox>
              <BtnEdit onPressOut={() => this._handleChangeNickname(isEditing)}>
                <Foundation name="pencil" color="#666" size={20} />
              </BtnEdit>
            </ProfileBox>
            <BorderBox></BorderBox>
            <BtnBox>
              <Button borderType onPressOut={() => this.props.navigation.navigate('ChangePw')}>
                <BtnText borderType>비밀번호 변경</BtnText>
              </Button>
              <Button onPressOut={this.props.requestLogout}>
                <BtnText>Sign Out</BtnText>
              </Button>
            </BtnBox>
          </Contents>
        </Wrap>
      )
  }
}




const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogout: () => {
      return dispatch(requestLogout());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mypage);

const Wrap = styled.View`
  flex: 1;
  padding-top: 5%;
`;

const HeaderBox = styled.View`
  position: relative;
  padding: 0 15px;
  flex: 1.2;
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
  right:15px; 
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