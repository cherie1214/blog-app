import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import WriterViewItem from './WriterViewItem';

const { height, width } = Dimensions.get("window");

export default class WriterView extends Component {
  constructor(props){
    super(props);
    this.state = {
      writerNickname: "bonobono",
      articleNum: 3,
    }
  }

  renderHeaderContent(){
    return(
      <HeaderBox>
        <ProfileBox>
          <ProfileImgBox source={require('../../assets/bonobono.jpg')}/>
          <Nickname>{this.state.writerNickname}</Nickname>
          <ArticleNum>글수 {this.state.articleNum}</ArticleNum>
        </ProfileBox> 
      </HeaderBox>
    )
  }

  renderSticky(){
    return(
      <StickyBox>
        <Nickname>{this.state.writerNickname}</Nickname>
      </StickyBox>
    )
  }

  renderFixedHeader() {
    return(
      <FixedHeaderBox>
        <BtnIcon onPressOut={() => this.props.navigation.navigate('Home')}>
          <Ionicons name="ios-arrow-round-back" color="#333" size={45} />
        </BtnIcon> 
      </FixedHeaderBox>
    )
  }

  render(){    
    return(
        <Wrap>         
          <ParallaxScrollView
            style={{ flex: 1}}
            backgroundColor="#fff"
            contentBackgroundColor="#f7f7f7"
            parallaxHeaderHeight={290}
            stickyHeaderHeight={90}
            // onChangeHeaderVisibility={() => {this.setState({headerVisibility: false})}}
            renderForeground={() => this.renderHeaderContent()}
            // renderStickyHeader={() => this.renderSticky()}
            renderFixedHeader={() => this.renderFixedHeader()}
            >
            <ConBox>
              <WriterViewItem />
              <WriterViewItem />
              <WriterViewItem />
            </ConBox>
          </ParallaxScrollView> 
        </Wrap>
      )
  }
}

const Wrap = styled.View`
  flex: 1;
`;

const HeaderBox = styled.View`
  position:relative;
  z-index:100;
  padding: 100px 0 20px;
  height:290px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
`;

const StickyBox = styled.View`
  position: relative;
  margin-top:7%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const FixedHeaderBox = styled.View`
  z-index:100;
  width: 100%;
  height: 90px;
  flex-direction: row;
  align-items: flex-end;
  background: #fff;
  border-bottom-width:1px;
  border-bottom-color: #dedede;
  box-shadow: 0px 3px 2px rgba(0,0,0,0.5);
`;
// position:absolute;
// z-index:100;
// top:0;
// left: 0;

const BtnIcon = styled.TouchableOpacity`  
  margin-left:15px;
  height:50px;
`;

const ProfileBox = styled.View`
  width: ${width};
  align-items: center;
  justify-content: center;
`;


const ProfileImgBox = styled.Image`
  width : 100px;
  height : 100px;
  border-radius : 50px;
  background-color : #ccc;
`;

const Nickname = styled.Text`
  margin-top:15px;
  font-family: 'hd-bold';
  font-size:20px;
  color:#333;
`;

const ArticleNum = styled.Text`
  margin-top:5px;  
  font-family: 'hd-regular';
  font-size:13px;
  color:#999;
`;

const ConBox = styled.View`
  padding:7%;
`;
