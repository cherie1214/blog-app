import React, { Component } from 'react';
import {  } from 'react-native';
import styled from 'styled-components';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class SignedMenu extends Component {
  componentDidMount(){
    //  alert(JSON.stringify(this.props.auth.login))
  }
  
  render() {
    const auth = this.props.auth;
    const notifyIcon = this.props.notifyIcon;
    const likeIcon = this.props.likeIcon;
    // alert(JSON.stringify(this.props.auth.login))
    
    return (
      
      <Wrap>
        {/*StatusBar hidden={true} />*/}
        <CloseBox>
          <BtnClose
            onPress={() => this.props.navigation.closeDrawer()}>
            <Ionicons
              name="ios-close"
              color="#333"
              size={50}
              style={{ marginRight: 15 }}
            />
          </BtnClose>
        </CloseBox>
        <ProfileBox
          onPress={() => this.props.navigation.navigate('Mypage')}>
          <ProfileImgBox source={{uri: auth.login.profileImg}} />
          <UserNickname>{auth.login.nickname}</UserNickname>
        </ProfileBox>
        <BorderBox />
        <BtnBox>
          <Button
            onPress={() => this.props.navigation.navigate('Write')}>
            <BtnText>글 쓰기</BtnText>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('Edit')}>
            <BtnText>글 관리</BtnText>
          </Button>
        </BtnBox>
        <IconBox>
          <IconBtn
            onPress={() => this.props.navigation.navigate('Notify')}>
            {notifyIcon ? <IconNew yellow /> : null}
            <MaterialCommunityIcons
              name="bell-outline"
              color="#fff"
              size={30}
            />
          </IconBtn>
          <IconBtn
            onPress={() => this.props.navigation.navigate('Like')}>
            {likeIcon ? <IconNew pink /> : null}
            <MaterialCommunityIcons
              name="heart-outline"
              color="#fff"
              size={30}
              style={{ marginTop: 5 }}
            />
          </IconBtn>
        </IconBox>
      </Wrap>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
  }
}

const SignedMenuWithNavigation = withNavigation(SignedMenu);
export default connect(mapStateToProps)(SignedMenuWithNavigation);

const Wrap = styled.View`
  flex: 1;
  padding-top:15%;
`;

const CloseBox = styled.View`
  flex: 1.5;
  align-items: flex-end;
`;

const BtnClose = styled.TouchableOpacity`

`;

const ProfileBox = styled.TouchableOpacity`
  flex: 3;
  flex-direction: column;
  align-items:center;
`;

const BorderBox = styled.View`
  margin-left:10%;
  margin-top:10px;
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const BtnBox = styled.View`
  flex: 4;
  margin-top:20%;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-bottom:15px;
  width:150px;
  height:44px;
  justify-content: center;
  align-items: center;
  border: 1px #ccc solid;
  border-radius: 22px;
`;

const IconBox = styled.View`
  flex: 4;
  flex-direction:row;
  justify-content: center;
`;

const IconBtn = styled.TouchableOpacity`
  margin: 0 8px;
  width:60px;
  height:60px;
  border-radius:30px;
  justify-content: center;
  align-items: center;
  background: #ccc;
`;

const IconNew = styled.View`
  position: absolute;
  top:0; 
  right:0;
  width:18px;
  height:18px;
  border-radius:9px;
  background-color: ${props => {
    if (props.yellow) {
      return "#FFCD19;"
    } else if (props.pink) {
      return "#EF3774;"
    }
  }}
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 30px;
  color:#999;
`;

const BtnText = styled.Text`
  font-family: 'hd-regular';
  color:#333;
  font-size:15px;
`;

const ProfileImgBox = styled.Image`
  margin-bottom:10px;
  width : 70px;
  height : 70px;
  border-radius : 35px;
  background-color : transparent;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const UserNickname = styled.Text`
  font-family: 'hd-bold';
  color:#333;
  font-size:17px;
  font-weight:500;
`;

