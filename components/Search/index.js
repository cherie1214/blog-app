import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { domain } from '../../config';

import ArticleTab from './ArticleTab';
import WriterTab from './WriterTab';

const { height, width } = Dimensions.get("window");

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 1,
      on: true,
      inputValue: this.props.navigation.getParam('text') || null,
      list1 : [],
      list2 : [],
      result: null,
    } 
  }

  componentDidMount(){
    this._handleSearch();
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleTabChange1(tab){
    this.setState({
      tab: 1,
      on: true,
    },() => {
      this._handleSearch();
    })
  }

  _handleTabChange2(tab){
    this.setState({
      tab: 2,
      on: false,
    },() => {
      this._handleSearch();
    })
  }

  _handleSearch(){
    const state = this.state;
    const { inputValue } = this.state;

    if(inputValue === null || inputValue === "" ){
      alert("최소 1글자 이상 입력해 주세요.")
      return false;
    }

    if(inputValue){
      axios.post(domain+'/api/search/articleAndWriter', {text:inputValue, tab : state.tab})
      .then((res) => {
        if(res.data.status === 'SEARCH_GET_SUCCESSED'){
          let obj = {
            ...state
          }
          obj["list"+state.tab] = res.data.list
          this.setState(obj);
          this.setState({ result: inputValue});
        }
      }).catch((error) => {
        alert("ERROR\n"+error.message);
      });
    }

  }

  render(){

    const { tab, on, inputValue, list1, list2, result } = this.state;
    
    return(
        <Wrap>
          <HeaderBox>
            <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
              <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
            </BtnIcon>
            <SearchBox>
              <InputSearch
                value={inputValue}
                onChangeText={this._handleTextChange}
                placeholder="Search"
              />
              <BtnIcon onPressOut={() => this._handleSearch()}>
                <Feather name="search" color="#afafaf" size={20}/>
              </BtnIcon>
            </SearchBox>
          </HeaderBox>
          <TabBox>
            <Tab visual={on} onPressOut={() => this._handleTabChange1(tab)}>
              <TabText visual={on}>글</TabText>
            </Tab>
            <Tab visual={!on} onPressOut={() => this._handleTabChange2(tab)}>
              <TabText visual={!on}>글쓴이</TabText>
            </Tab>
          </TabBox>
          <ScrollView>
          <ConBox>
              {tab === 1 ? <ArticleTab result={result} list={list1} /> : <WriterTab result={result} list={list2} />}
            </ConBox>  
          </ScrollView>           
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
`;

const HeaderBox = styled.View`
  z-index:100;
  padding: 0 15px;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background: #fff;
`;

const BtnIcon = styled.TouchableOpacity`
`;

const SearchBox = styled.View`
  margin-left:15px;
  width:${width - 70};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputSearch = styled.TextInput`
  width: ${width * 0.65};
  font-family: 'hd-bold';
  font-size:18px;
  color:#333;
`;


const TabBox = styled.View`
  z-index:100;
  height:50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  background: #fff;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.05);
`;

const Tab = styled.TouchableOpacity`
  width: ${width * 0.5};
  height:50px;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${props => props.visual ? "2px;" : "1px;"}
  border-bottom-color: ${props => props.visual ? "#5ED9FF;" : "transparent;"}
`;

const TabText = styled.Text`
  font-family: ${props => props.visual ? "hd-bold;" : "hd-regular;"}
  font-size:15px;
  color: ${props => props.visual ? "#5ED9FF;" : "#333;"}
`;

const ConBox = styled.View`
  min-height: ${height - 100}
  background:#f7f7f7;
`;




