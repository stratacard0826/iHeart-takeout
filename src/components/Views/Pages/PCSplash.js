import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
 } from 'react-native';


const assetDir = '../../../../assets';

class Splash extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require(assetDir + "/images/logo/logo.png")} />
        <ActivityIndicator style={styles.spinner} size="large" color="#2B3990" />
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'blue'
  }

});

module.exports = Splash;
