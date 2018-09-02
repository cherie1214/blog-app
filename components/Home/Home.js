import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
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
    } else {
      this.setState({ confirmVisible: true })
    }
  }
  




  render() {
    const confirmMsg = `글쓰기는 로그인 후에 이용 가능합니다.` + String.fromCharCode(13) + `로그인 페이지로 이동하시겠습니까?`;

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
          <Button onPressOut={() => this.handleGoWrite()}>
            <SimpleLineIcons name="plus" color="#333" size={30} />
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
`;

const HomeMenu = styled.View`
  flex: 1.3;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

const HomeHeader = styled.View`
  flex: 1.4;
  padding-bottom:5%;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

const HomeBody = styled.View`
    flex : 6;
`;

const HomeFooter = styled.View`
    flex : 1.3;
    align-items: center;
    justify-content: center;
`;

const Button = styled.TouchableOpacity`
`;


