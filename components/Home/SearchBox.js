import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSearching: false,
      inputValue: ""
    }
  }
  
  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleInputAppear(){
    this.setState({
      isSearching: true,
    });
  }
  
  _handleSearchSubmit(){
    this.setState({
      isSearching: false,
    });
  }
  
 
  render() {
    const { isSearching, inputValue } = this.state;
    
    return (
      <Wrap>
        <LogoBox>
          {isSearching ? (
             <InputSearch
                value={inputValue}
                onChangeText={this._handleTextChange}
                placeholder="Search"
                placeholderTextColor="#ccc"
              />
            ) : (
             <Logo>Travel</Logo>
            )
          }
        </LogoBox>
          {isSearching ? (
            <Button onPressOut={() => this.props.navigation.navigate('Search')}>
              <Feather name="check" color="#afafaf" size={25} />
            </Button>  
            ) : (
            <Button onPressOut={() => this._handleInputAppear()}>
              <Feather name="search" color="#afafaf" size={25} />
            </Button>  
            )
          }
      </Wrap>  
    );
  }
}

export default withNavigation(SearchBox);

const Wrap = styled.View`
  width: ${width * 0.82};
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const LogoBox = styled.View`
  width: ${width * 0.65};
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 50px;
  color:#999;
`;

const InputSearch = styled.TextInput`
  font-family: 'hd-regular';
  height:35px;
  font-size:20px;
`;

const Button = styled.TouchableOpacity`
  margin-right:10px;
`;

