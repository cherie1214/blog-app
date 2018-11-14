import React, { Component } from 'react'
import { CameraRoll, Dimensions, ActivityIndicator, View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';


import { Camera, Permissions } from 'expo';

const { height, width } = Dimensions.get("window");
const width30per = width / 3;

class CameraRollScreenBak extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: null,
    }
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({first: 50});
    this.setState({ photos });
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
          <ImgBox>
            <Img source={photo.image} resizeMode="cover" />        
          </ImgBox>
      );
    }
    return images;
  }

  render() {
    let { photos } = this.state;
    return (
      <Wrap>
        <StatusBar hidden={false} />
        <HeaderBox>
          <BtnIcon onPress={() => this.props.navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" color="#333" size={45}/>
          </BtnIcon>
          <H1>카메라롤</H1>
          <BtnIcon onPress={() => this.props.navigation.navigate('Camera')}>
            <SimpleLineIcons name="camera" color="#333" size={29}/>
          </BtnIcon>
        </HeaderBox>
        <ScrollView
           style={{backgroundColor: 'blue'}}
         > 
         <View style={{flexDirection: 'row', width:'100%', height:'100%'}}>
          {photos
            ? this._renderPhotos(photos)
            : <Loading><ActivityIndicator animating size="large" /></Loading>}
          </View>
        </ScrollView>
      </Wrap>
    );
  }  
}

export default withNavigation(CameraRollScreenBak);

const Wrap = styled.View`
  flex: 1;
  margin:8% 0 -8%;
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
  font-family: 'hd-bold';
`;

const Loading = styled.View`
  margin-top: 8%;
`;

const ConBox = styled.View`
`;

const ImgBox = styled.View`
  overflow:hidden;
  position:relative;
  padding: 1px;
  width: ${width30per};
  height: ${width30per};
  background: red;
`;

const Img = styled.Image`
  position: absolute;
  top:0; 
  left:0;
  width: 100%;
  height:100%;
`;