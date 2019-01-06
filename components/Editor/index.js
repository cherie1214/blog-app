import React, { Component } from 'react';
import styled from 'styled-components';
import { WebView, View, Dimensions, Button, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");

export default class MyWeb extends Component {
  constructor(props){
    super(props);
    this.state = {      
      optionsType: "text",
    };
  }

  render() {
    const { optionsType } = this.state;

    return (
      <Wrap>
        <WebView
          source={require("./WebView.html")}
          style={{width : '100%', height: '100%'}}
          onMessage={(event)=>{
            const x= event.nativeEvent.data;
            console.log("x: ",x);
            console.log("Type is: ",typeof(x));
        }}
        />
      </Wrap>
    );
  }
}

const Wrap = styled.View`
  flex: 1;
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
