import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import CardItem from './CardItem';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setLikeIcon } from '../../actions';

const { height, width } = Dimensions.get("window");

class Card extends Component {
 

  render() {
    return (
      <Wrap>
        <CardItem props={this.props} token={this.props.login.token} nickname={this.props.login.nickname} setLikeIcon={this.props.setLikeIcon} />
      </Wrap>  
    );
  }
}

const Wrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


const mapStateToProps = (state) => {
  return {
      login: state.redux.auth.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeIcon : (bool) => {
          return dispatch(setLikeIcon(bool));
      }
  };
};

const CardWithNavi = withNavigation(Card);
export default connect(mapStateToProps, mapDispatchToProps)(CardWithNavi);