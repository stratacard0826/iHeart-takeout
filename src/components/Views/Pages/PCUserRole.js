import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';


const assetDir = '../../../../assets';

class LVUserRole extends React.Component {

  static navigationOptions(props) {

    return {
      headerStyle: {
        backgroundColor: props.navigation.state.params.bgColor.backgroundColor,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
      headerTintColor: '#FFFFFF',
    };
  };

  //
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.navigation.state.params.bgColor]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.s1}>
          <Image style={styles.logo} source={require(assetDir + "/images/logo-white-full/logo-white-full.png")} />
        </View>
        <View style={styles.s2}>
          <View style={styles.s2_1}>
            <TouchableOpacity style={[styles.buttonWrapper, this.props.navigation.state.params.bgColor]} onPress={() => {
                this.props.navigation.navigate(this.props.navigation.state.params.dest, { bgColor : { backgroundColor : '#F48666' }, role:'customer', options:{container:{marginBottom:0}, profileItemContainer:{marginTop:0}} })
            }} >
              <Text style={[styles.button, {color:'#FFFFFF'}]} >ORDER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonWrapper, { backgroundColor: '#FFFFFF' }]} onPress={() => {
                this.props.navigation.navigate(this.props.navigation.state.params.dest, { bgColor : { backgroundColor : '#F16522' }, role:'chef', options:{container:{marginBottom:0}, profileItemContainer:{marginTop:0}} })
              }} >
              <Text style={[styles.button, {color:this.props.navigation.state.params.bgColor.backgroundColor}]}>CHEF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 30,
  },

  s1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },


  logo: {
    width: 225,
    resizeMode: 'contain',
  },

  s2: {
    flex: 2,
  },

  s2_1: {
    flex: 1,
  },

  buttonWrapper: {
    height: 55,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },

  button: {
    fontSize: 18,
  },

});

module.exports = LVUserRole;
