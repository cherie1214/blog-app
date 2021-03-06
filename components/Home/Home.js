import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import styled, { css } from 'styled-components';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getStorage } from '../../actions';
import { ConfirmDialog } from 'react-native-simple-dialogs';

// components
import SearchBox from './SearchBox';
import Card from './Card';

const { height, width } = Dimensions.get("window");

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmVisible: false,
    }
  }
  
  componentDidMount(){
    if(!this.props.auth.login.loggedIn){
      this.props.getStorage();
    }
  }

  handleGoWrite = () => {
    const auth = this.props.auth;

    if(auth.login.loggedIn){
      this.props.navigation.navigate("Write")
      // this.props.navigation.navigate("WebViewExample")      
    } else {
      this.setState({ confirmVisible: true })
    }
  }
  
  render() {
    const confirmMsg = `글쓰기는 로그인 후에 이용 가능합니다.` + String.fromCharCode(13) + `로그인 페이지로 이동하시겠습니까?`;

    return (
      <Container>
        <HomeMenu>
          <Button onPress={() => this.props.navigation.toggleLeftDrawer()}>
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
          <Button footerBtn onPress={() => this.handleGoWrite()}>
            <SimpleLineIcons name="pencil" color="#fff" size={20} />
          </Button>
          <Button footerBtn onPress={() => this.props.navigation.navigate("List")}>
            <SimpleLineIcons name="list" color="#fff" size={25} />
          </Button>
          <ConfirmDialog
              // title=""
              message={confirmMsg}
              visible={this.state.confirmVisible}
              // onTouchOutside={() => this.setState({backConfirmVisible: false})}
              positiveButton={{
                  title: "네",
                  onPress: () => this.props.navigation.navigate("SignIn")
              }}
              negativeButton={{
                  title: "아니오",
                  onPress: () => this.setState({confirmVisible: false}) 
              }}
              />  
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
    background: #fff;
`;

const HomeMenu = styled.View`
  flex: 1.3;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

const HomeHeader = styled.View`
  flex: 1.3;
  padding-bottom:5%;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

const HomeBody = styled.View`
    flex : 6.3;
`;

const HomeFooter = styled.View`
    flex : 1.8;
    flex-direction:row;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
  margin: 0 10px;
  ${prop => prop.footerBtn ? `
    align-items: center;
    justify-content: center;
    width: 50px; 
    height: 50px;
    border-radius: 25px;
    background:#bbb;
  ` : null}
`;


