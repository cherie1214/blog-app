import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

export default class Home extends Component {
  state = {
    inputValue: ""
  };

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Travel</Text>
          <TextInput
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            style={styles.inputSearch}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    
  },
  inputSearch: {
    
  },
});
