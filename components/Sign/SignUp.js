import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { userSignUp, signUpInit} from '../../actions';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      pw: "",
      cpw: "",
      nickname: "",
    }
  }
  
  componentDidUpdate(prevProps){
    const result = this.props.result;
    if(prevProps.result !== result){      
      if(result === "SUCCESS"){
        this.props.signUpInit();
        alert("회원가입이 완료되었습니다.")
        this.props.navigation.navigate('SignIn');
      } else if(result === "FAILED"){
        this.props.signUpInit();
        alert("오류가 발생했습니다.")
      }
    }    
  }

  render() {
    const userInfo = this.state;

    return (
      <Wrap>
        <BtnBox>
          <BtnBack onPressOut={() => this.props.navigation.navigate('SignIn')}>
            <Ionicons name="ios-arrow-round-back" color="#fff" size={60} style={{marginLeft:15}}/>
          </BtnBack>
        </BtnBox>
         <LogoBox>
          <Logo>New Travel{this.props.result}</Logo>
          <BorderBox></BorderBox>
        </LogoBox>
        <InputBox>
          <InputWrap>
            <InputText 
              value={this.state.id}
              onChangeText={(id) => this.setState({id: id.toLowerCase()})}
              placeholder="Email Address"
              placeholderTextColor="#fff"
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
          <InputWrap>
             <InputText 
              value={this.state.pw}
              onChangeText={(pw) => this.setState({pw: pw})}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
           <InputWrap>
             <InputText 
              value={this.state.cpw}
              onChangeText={(cpw) => this.setState({cpw: cpw})}
              placeholder="Confirm Password"
              placeholderTextColor="#fff"
              secureTextEntry
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
           <InputWrap>
             <InputText 
              value={this.state.nickname}
              onChangeText={(nickname) => this.setState({nickname: nickname})}
              placeholder="Nickname"
              placeholderTextColor="#fff"
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
          <P>* 닉네임은 마이페이지에서 변경할 수 있어요.</P>
          <Button onPressOut={() => this.props.userSignUp(userInfo)} >
            <BtnText>Sign Up</BtnText>
          </Button>
        </InputBox>
      </Wrap>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.redux.auth.http.status,
    result: state.redux.auth.http.result,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp: (userInfo) => {
      return dispatch(userSignUp(userInfo));
    },
    signUpInit: () => {
      return dispatch(signUpInit());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const Wrap = styled.View`
  flex: 1;
  background: #9FA3A8;
`;

const BtnBox = styled.View`
  flex: 1.5;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

const BtnBack = styled.TouchableOpacity`
`;

const Button = styled.TouchableOpacity`
  width: ${width * 0.7};
  height: 60px;
  justify-content: center;
  align-items:center;
  border-radius:30px;
  background:#333;
  ${props => {
      if(props.small){
          return `height:40px; border: 1px #fff solid; border-radius: 20px; background-color: transparent;`
      }
  }}
`;

const LogoBox = styled.View`
  flex: 1;
  margin-left:18%;
  justify-content: flex-end;
`;

const BorderBox = styled.View`
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const InputBox = styled.View`
  flex: 7.5;
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-top: 15px;
  width: ${width * 0.7};
  height:40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color:#fff;
  border-bottom-width: 2px;
`;

const InputText = styled.TextInput`
  padding: 5px 0;
  width: ${width * 0.7};
  font-family: 'hd-regular';
  font-size: 15px;
  color:#fff;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 40px;
  color:#fff;
`;

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: ${props => props.fs14 ? ("14px;") : ("16px;")}
  color:#fff;
`

const P = styled.Text`
  width: ${width * 0.7};
  margin: 10px 0 40px;
  font-family: 'hd-regular';
  font-size:14px;
  color:#fff;
`