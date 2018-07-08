import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { requestLogin, requestLogout } from '../actions';

class Login extends Component {
 render() {
    return (
      <View style={styles.container}>
          <Text style={styles.logo}>{this.props.status}</Text>
          <TouchableOpacity onPressOut={this.props.requestLogin}>
            <Text style={{color:'blue'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={this.props.requestLogout}>
            <Text style={{color:'red'}}>Logout</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.auth.login.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: () => {
      return dispatch(requestLogin());
    },
    requestLogout: () => {
      return dispatch(requestLogout());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);