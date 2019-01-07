import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  Text,
 } from 'react-native';


const assetDir = '../../../../assets';

import Validator from '../../../../src/util/validator.js';


class Dish extends React.Component {


  //
  constructor(props) {
    super(props);


  }

  render() {
    const { options } = this.props;

    return (
      <View style={[styles.container, options.container]}>
        <Text>Dish</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

module.exports = Dish;
