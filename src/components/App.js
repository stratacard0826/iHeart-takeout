/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import Main from "../../src/components/Controllers/RootController";

class App extends React.Component {
  render() {
    return (
      <Main />
   );
  }
}

module.exports = App;
