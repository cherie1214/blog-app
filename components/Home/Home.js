import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getStorage } from '../../actions';

// components
import SearchBox from './SearchBox';
import Card from './Card';

const { height, width } = Dimensions.get("window");

class Home extends Component {
  
  componentDidMount(){
    if(!this.props.auth.login.loggedIn){
      this.props.getStorage();
    }
  }

  render() {
    return (
      <Container>
        <HomeMenu>
          <Button onPressOut={() => this.props.navigation.toggleLeftDrawer()}>
            <Ionicons name="ios-menu" color="#333" size={40} style={{marginLeft:15}}/>
          </Button>
        </HomeMenu>
        <HomeHeader>
          <SearchBox />
        </HomeHeader>
        <HomeBody>
          <Card />
        </HomeBody>
        <HomeFooter>
          <Button onPressOut={() => this.props.navigation.navigate('Write')}>
            <SimpleLineIcons name="plus" color="#333" size={30} />
          </Button>
        </HomeFooter>
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStorage: () => {
      return dispatch(getStorage());
    }
  }
}

const HomeWithNavigation = withNavigation(Home);
export default connect(mapStateToProps, mapDispatchToProps)(HomeWithNavigation);


const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
`;

const HomeMenu = styled.View`
  flex: 1.5;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

const HomeHeader = styled.View`
  flex: 1.5;
  padding-bottom:5%;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

const HomeBody = styled.View`
    flex : 6;
`;

const HomeFooter = styled.View`
    flex : 1.5;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
`;


