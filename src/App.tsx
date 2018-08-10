/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Component, default as React } from 'react';
import { StyleSheet, View } from 'react-native';

import { Hello } from './components/Hello';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Hello name={'Coucou'} enthusiasmLevel={5}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
