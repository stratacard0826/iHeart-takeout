import React from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
 } from 'react-native';
import { StackNavigator } from 'react-navigation';

const assetDir = '../../../assets';

//View Stack
import TabBarController from './TBController';

import LVMainView from "../../../src/components/Views/Pages/PCMainView";
import LVUserRole from "../../../src/components/Views/Pages/PCUserRole";
import LVLogin from "../../../src/components/Views/Pages/PCLogin";
import LVSignup from "../../../src/components/Views/Pages/PCSignup";

import Global from "../../../src/global.js";
import Debug from "../../../src/util/debug.js";
import User from "../../../src/modals/user/user.js";
import Dish from "../../../src/modals/menu/dish/dish.js";



//Gloabl Header Themes
const _debugMode = false;
const styles = StyleSheet.create({

  TBHeader: {
    paddingLeft:5,
    paddingRight:5,
    paddingTop:20,
    height:65,
    borderBottomWidth: 1,
    borderBottomColor: '#BE5D31',
    flexDirection:'row',
    backgroundColor: Debug.layoutColor(_debugMode, '#F16522', 0),
  },

  TBHeaderLeft: {
    flex:0.5,
    backgroundColor: Debug.layoutColor(_debugMode, '', 1),
  },

  TBHeaderRight: {
    flex:0.5,
    backgroundColor: Debug.layoutColor(_debugMode, '', 2),
  },

  TBHeaderCenter: {
    flex:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: Debug.layoutColor(_debugMode, '', 3),
  },

  TBHeaderImage: {
    resizeMode:'contain',
    width:180,
    backgroundColor: Debug.layoutColor(_debugMode, '', 4),
  },
});

const ChefThemeHeader = {
  header: (
    <View style={styles.TBHeader}>
      <View style={styles.TBHeaderLeft}>
      </View>
      <View style={styles.TBHeaderCenter}>
        <Image style={styles.TBHeaderImage} source={require('../../../assets/images/logo-white-full-2/logo-white-full-2.png')} />
      </View>
      <View style={styles.TBHeaderRight}>
      </View>
    </View>
  )
};

const CustomerThemeHeader = {
  header: (
    <View style={[styles.TBHeader, {height:75, backgroundColor:'#F48666'}]}>
      <View style={styles.TBHeaderLeft}>
      </View>
      <View style={styles.TBHeaderCenter}>
        <Image style={[styles.TBHeaderImage, {width:110}]} source={require('../../../assets/images/logo-white-full/logo-white-full.png')} />
      </View>
      <View style={styles.TBHeaderRight}>
      </View>
    </View>
  )
};


const MainThemeHeader = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
};

const LVNav = StackNavigator({

  //Views
  LVMainView: {
    screen: LVMainView,
    navigationOptions: MainThemeHeader,
  },

  LVUserRole: {
    screen: LVUserRole,
    //navigationOptions: MainThemeHeader,
  },

  LVSignup: {
    screen: LVSignup,
    navigationOptions: {
      ...MainThemeHeader,
      title: 'Sign Up',
    },
  },

  LVLogin: {
    screen: LVLogin,
    //navigationOptions: MainThemeHeader,
  },
});


const TBCChefNav = StackNavigator({

  //Views
  TabBarController: {
    screen: TabBarController,
    navigationOptions: ChefThemeHeader
  },
});

const TBCCustNav = StackNavigator({

  //Views
  TabBarController: {
    screen: TabBarController,
    navigationOptions: CustomerThemeHeader
  },
});



class Navigation extends React.Component {

  constructor(props) {
    super(props);

    console.log("class Navigation");
    let onload = <LVNav screenProps={{login:props.login}} />;

    if(props.onLoad == "TBCNav")
    {
      if(props.user.role == "chef") {
        onload = (
          <View style={{flex:1}}>
            <StatusBar barStyle="light-content" />
            <TBCChefNav screenProps={{user:props.user, logout:props.logout}} />
          </View>
        );
      }
      else if(props.user.role == "customer") {
        console.log("TBCCustNav Loaded");
        onload = (
          <View style={{flex:1}}>
            <StatusBar barStyle="light-content" />
            <TBCCustNav screenProps={{user:props.user, logout:props.logout}} />
          </View>
        );
      }
    }



    this.state = {
      navigation: onload,
    };
  }

  render() {
    return this.state.navigation;
  }
}


module.exports = Navigation;
