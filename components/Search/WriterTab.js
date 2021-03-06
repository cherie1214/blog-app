import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components';

import WriterItem  from './WriterItem';

const { height, width } = Dimensions.get("window");

export default class ArticleTab extends Component {
  constructor(props){
    super(props);
    this.state = {
    } 
  }
  renderFooter = (
    <View
      style={{
        paddingVertical: 20,
        // borderTopWidth: 1,
        // borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );

  _keyExtractor = (item, index) => item._id;

  render(){
    const { result, list, loading, refreshing, count, init } = this.props;

    return(
      <Wrap>
        {count === 0 ? (
          <ResultBox>
            <ResultText>"{result}"에 대한 글쓴이 검색 결과가 없습니다.</ResultText>
          </ResultBox>
          ) : (
          <View>
            <ResultBox>
              <ResultText>"{result}" 글쓴이 검색결과 {count}건</ResultText>
            </ResultBox>
            <FlatList
              data={list} 
              renderItem={({item}) => <WriterItem {...item} key={item._id}/>}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              ListFooterComponent={loading ? this.renderFooter : null}
              refreshing={refreshing}
              onRefresh={this.props.handleRefresh}
              onEndReached={this.props.handleLoadMore}
              onEndReachedThreshold={0}
              />
          </View>
          )}       
      </Wrap>
    )  
  }
}

const Wrap = styled.View`
  flex: 1;
  padding-bottom:7%;
`;

const ResultBox = styled.View`
  padding: 0 7%;
  height:45px;
  justify-content:center;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const ResultText= styled.Text`
  font-size:13px;
  font-family: 'hd-regular';
  color:#999;
`;
