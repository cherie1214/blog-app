import React, { Component } from 'react';
import { Dimensions, findNodeHandle, TextInput } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { userSignIn, signInInit, likeIconRepeat } from '../../actions';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { ScrollViewSmart } from 'react-native-scrollview-smart';

const { height, width } = Dimensions.get("window");

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      pw: "",
    };
    this.scrollOnFocus = this.scrollOnFocus.bind(this);
  }

  scrollOnFocus = inputName => () => {
    this.scroll.inputFocused(
      findNodeHandle(this[inputName]),
    );
  }

  componentDidMount(){
    // this.getKey();
  }

  componentDidUpdate(prevProps){
    const auth = this.props.auth;
    if(prevProps.auth !== auth){  
      if(auth.http.result === "SUCCESS"){
        this.props.signInInit();
        // alert("로그인 되었습니다.");
        this.props.likeIconRepeat(this.props.login.token);
        this.props.navigation.navigate('Home');
      } else if(auth.http.result === "FAILED"){
        this.props.signInInit();
        alert("로그인에 실패했습니다.");
      }
    }    
  }
  
  async getKey(){
    try {
      const _storedData = await AsyncStorage.getItem('@BlogApp.Auth');
      alert(_storedData);
    } catch(error) {
      alert("Error retrieving data :" + error);
    }
  }

  render() {

    const userInfo = this.state;
    // const auth = this.props.auth;
    // const authState = JSON.stringify(auth, 0, 2)

    return (
      <ScrollViewSmart
        ref={e => (this.scroll = e)}
        style={{flex: 1, backgroundColor: "#9FA3A8"}}
        keyboardShouldPersistTaps={'never'}
      >
      <Wrap>
        <CloseBox>
          <BtnClose onPress={() => this.props.navigation.navigate('Home')}>
            <Ionicons name="ios-close" color="#fff" size={60} style={{marginLeft:15}}/>
          </BtnClose>
        </CloseBox>
        <LogoBox>
          <Logo>Travel</Logo>
          <BorderBox></BorderBox>
          {/* <Text style={{height:210}}>{authState}</Text> */}
        </LogoBox>
        <InputBox>
          <InputWrap>
            <Feather name="user" color="#999" size={20} />
            <TextInput 
              style={InputTextStyle}
              value={this.state.id}
              onChangeText={(id) => this.setState({id: id.toLowerCase()})}
              placeholder="Email Address"
              placeholderTextColor="#bbb"
              autoCorrect={false}
              autoCapitalize={"none"}
              autoFocus={true}
              returnKeyType={'next'}
              ref={e => (this.input1 = e)}
              onFocus={this.scrollOnFocus('input1')}
              onSubmitEditing={() => { this.input2.focus(); }}
            />
          </InputWrap>
          <InputWrap>
             <Feather name="lock" color="#999" size={20} />
             <TextInput 
              style={InputTextStyle}
              value={this.state.pw}
              onChangeText={(pw) => this.setState({pw: pw})}
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={'done'}
              ref={e => (this.input2 = e)}
              onFocus={this.scrollOnFocus('input2')}
            />
          </InputWrap>
          <Button onPress={() => this.props.userSignIn(userInfo)} >
            <BtnText>Sign In</BtnText>
          </Button>
          <P>Create Your Travel</P>
          <Button small onPress={() => this.props.navigation.navigate('SignUp')}>
            <BtnText fs14>Sign Up</BtnText>
          </Button>
        </InputBox>
      </Wrap>
      </ScrollViewSmart>
    );
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
    userSignIn: (userInfo) => {
      return dispatch(userSignIn(userInfo));
    },
    signInInit: () => {
      return dispatch(signInInit());
    },
    likeIconRepeat: (token) => {
      return dispatch(likeIconRepeat(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const Wrap = styled.View`
  flex: 1;
  height: ${height};
`;

const CloseBox = styled.View`
  height: ${height * 0.15};
  align-items: flex-end; 
  flex-direction: row;
  justify-content: flex-start;
`;


const BtnClose = styled.TouchableOpacity`
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
  margin-left:18%;
  height: ${height * 0.10};
  justify-content: flex-end;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 50px;
  color:#fff;
`;

const BorderBox = styled.View`
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const InputBox = styled.View`
  height: ${height * 0.75};
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-bottom:15px;
  padding: 5px 30px;
  width: ${width * 0.7}
  height:60px;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  background: #fff;
`;

// const InputText = styled.TextInput`
//   padding: 5px 0;
//   width: ${width * 0.7};
//   font-family: 'hd-regular';
//   font-size: 15px;
//   color:#fff;
// `;

const InputTextStyle = {
  marginLeft: 10, 
  padding: 5,
  width: 150,
  fontFamily: 'hd-regular',
  fontSize: 15
};

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: ${props => props.fs14 ? ("14px;") : ("16px;")}
  color:#fff;
`

const P = styled.Text`
  margin:40px 0 15px;
  font-family: 'hd-bold';
  font-size:14px;
  color:#fff;
`
