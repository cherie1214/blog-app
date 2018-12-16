import React, { Component } from 'react'
import { Dimensions, findNodeHandle, TextInput } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { userChangePw } from '../../actions';
import { ScrollViewSmart } from 'react-native-scrollview-smart';

const { height, width } = Dimensions.get("window");

class ChangePw extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.auth.login.id,
      currentPw: "",
      newPw: "",
      confirmPw: "",
    };
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  scrollOnFocus = inputName => () => {
    this.scroll.inputFocused(
      findNodeHandle(this[inputName]),
    );
  }
  
  render(){
    const UserInfo = this.state;
    const Token = this.props.auth.login.token;

    return(
      <ScrollViewSmart
        ref={e => (this.scroll = e)}
        style={{flex: 1}}
        keyboardShouldPersistTaps={'never'}
      >
        <Wrap>
          <HeaderBox>
            <BtnIcon onPress={() => this.props.navigation.navigate('Mypage')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <H1>비밀번호 변경</H1>
          </HeaderBox>
          <InputBox>
            <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.currentPw}
                onChangeText={(currentPw) => this.setState({currentPw: currentPw})}
                placeholder="Current Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCorrect={false}
                autoFocus={true}
                returnKeyType={'next'}
                ref={e => (this.input1 = e)}
                onFocus={this.scrollOnFocus('input1')}
                onSubmitEditing={() => { this.input2.focus(); }}
              />
            </InputWrap>
             <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.newPw}
                onChangeText={(newPw) => this.setState({newPw: newPw})}
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCorrect={false}
                returnKeyType={'done'}
                ref={e => (this.input2 = e)}
                onFocus={this.scrollOnFocus('input2')}
                onSubmitEditing={() => { this.input3.focus(); }}
              />
            </InputWrap>
             <InputWrap>
              <TextInput 
                style={InputTextStyle}
                value={this.state.confirmPw}
                onChangeText={(confirmPw) => this.setState({confirmPw: confirmPw})}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                returnKeyType={"done"}
                autoCorrect={false}
                returnKeyType={'done'}
                ref={e => (this.input3 = e)}
                onFocus={this.scrollOnFocus('input3')}
              />
            </InputWrap>
            <Button onPress={() => this.props.userChangePw(UserInfo, Token)}>
              <BtnText>Submit</BtnText>
            </Button>
          </InputBox>
        </Wrap>
      </ScrollViewSmart>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userChangePw: (UserInfo, token) => {
      return dispatch(userChangePw(UserInfo, token));
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChangePw);

const Wrap = styled.View`
  flex: 1;
  margin-top: 8%;
  height: ${height - (height * 0.08)};
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
  font-family: 'hd-regular';
`;

const InputBox = styled.View`
  height: ${height - 50 - (height * 0.08)};
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-top: 25px;
  width: ${width * 0.7};
  height:40px;
  flex-direction: row;
  align-items: center;
  border-bottom-color:#666;
  border-bottom-width: 2px;
`;

const InputText = styled.TextInput`
  padding: 5px 0;
  width: ${width * 0.7};
  font-family: 'hd-regular';
  font-size: 15px;
  color:#333;
`;

const InputTextStyle = {
  paddingVertical: 5,
  width: width * 0.7,
  fontFamily: 'hd-regular',
  fontSize: 15,
  color: "#333",

}

const Button = styled.TouchableOpacity`
  margin-top:30px;
  width: ${width * 0.7};
  height: 60px;
  justify-content: center;
  align-items:center;
  border-radius:30px;
  background:#666;
`;

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: 16px;
  color:#fff;
`
