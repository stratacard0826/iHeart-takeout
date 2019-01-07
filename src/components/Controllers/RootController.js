
import React from 'react';
import {
  AsyncStorage,
  View,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

const assetDir = '../../../assets';

import User from '../../../src/modals/user/user.js';
import Splash from '../../../src/components/Views/Pages/PCSplash';
import Navigation from './NavigationController';
import Ajax from '../../../src/util/ajax.js';


const asyncStorageModalId_user = '@TakeoutModal:user';
const asyncStorageModalId_order = '@TakeoutModal:order';
const asyncStorageModalId_dish = '@TakeoutModal:dish';
const asyncStorageModalId_drink = '@TakeoutModal:drink';


class Main extends React.Component {


  //TEMP
  login = (user) => {

    this.setState((prevState) => {
      return {
        refreshState: prevState.refreshState + 1,
        onLoad: <Navigation key={(prevState.refreshState + 1)} logout={this.logout} user={user} onLoad="TBCNav" />,
      };
    });
  }
  //TEMP

  logout = () =>
  {
    this.setState((prevState) => {
      console.log('RESET STATE');
      return {
        refreshState: prevState.refreshState + 1,
        onLoad: <Navigation key={(prevState.refreshState + 1)} login={this.login} user={null} onLoad="LVNav" />,
      };
    });
  }

  //
  constructor(props) {
    super(props);

    this.state = {
      refreshState: 0,
      onLoad: <Splash />,
    };

    this.login.bind(this);
    this.logout.bind(this);
  }

  //Lifecycle Component Methods
  componentDidMount() {

    //Set null to check storage


    //Check if there is any user logged in
    User.getUser(null).then((user) => {

      if(user == null) {

        //Failed to retrieve user data.. set view to main
        console.log("LVNav Navigation Loaded");
        this.setState({
          onLoad: <Navigation key={this.state.refreshState} login={this.login} user={user} onLoad="LVNav" />,
        });
      }
      else
      {
        //User found.. set initial view
        console.log("TBCNav Navigation Loaded");
        this.setState({
          onLoad: <Navigation key={this.state.refreshState} logout={this.logout} user={user} onLoad="TBCNav" />,
        });
      }
    });

  }


  render() {

    console.log('RENDER ROOT' + JSON.stringify(this.state.onLoad));
    return this.state.onLoad;
  }
}



module.exports = Main;
