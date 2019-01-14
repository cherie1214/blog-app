import React, { Component } from 'react';
import styled, { consolidateStreamedStyles } from 'styled-components';
import { WebView, View, Dimensions, Button, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class MyWeb extends Component {
  constructor(props){
    super(props);
    this.state = {
      req: null,
    }
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidUpdate(){
    if(this.props._editorReq != this.state.req) {
      this.setState({ 
        req: this.props._editorReq
      }, () => {
        console.log(this.state.req)
        this.webView.postMessage(this.state.req.replace("*", ""));
      })
    }  
      
  }

  onMessage( event ) {
    let data = event.nativeEvent.data;
    data = JSON.parse(data)
    if(data.type == 'format'){
      this.props._handleFormat(data.value);
    }
  }


  render() {

    return (
      <Wrap>
        <WebView
          source={require("./WebView.html")}
          style={{width : '100%', height: '100%'}}
          onMessage={this.onMessage}
          ref={( webView ) => this.webView = webView}
        />
        {/* <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
          style={{position: 'fixed', bottom: 150, width: '100%', height: 50, backgroundColor:'red'}}
          ></KeyboardAvoidingView> */}
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  position:relative;
`

const EditorOptions = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: #fff;
`;

const OptRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
  width: ${width - 60};
  background: #fff;
  border-left-width: 1px;
  border-left-color: #dfdfdf;
`

const BtnOpt = styled.TouchableOpacity`
  width:50px; 
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
