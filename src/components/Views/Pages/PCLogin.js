import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  Text,
 } from 'react-native';

const assetDir = '../../../../assets';

import User from '../../../../src/modals/user/user.js';
import Order from '../../../../src/modals/order/order.js';
import Dish from '../../../../src/modals/menu/dish/dish.js';
import Drink from '../../../../src/modals/menu/drink/drink.js';

import Validator from '../../../../src/util/validator.js';
import Ajax from '../../../../src/util/ajax.js';

class Login extends React.Component {

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

    let imageSrc = require(assetDir + '/images/chef-hat/chef-hat.png');
    if(props.navigation.state.params.role == "customer") {
      imageSrc = require(assetDir + '/images/knife-fork/knife-fork.png');
    }

    this.state = {
      email: '',
      emailValid: false,
      password: '',
      passwordValid: false,
      imageSrc: imageSrc,
      secure: true,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.container, this.props.navigation.state.params.bgColor]} behavior="padding" enabled>
        <StatusBar barStyle="light-content" />
        <View style={styles.s1}>
          <Image style={styles.image} source={this.state.imageSrc} />
        </View>
        <View style={styles.s2}>
          <View style={styles.s2_1}>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.textInput} placeholder="Email" onChangeText={(text) => {
                  
                this.setState({ 
                  email: text,
                  emailValid: Validator.emailString(text), 
                });
              }} value={ this.state.email } keyboardType={'email-address'} placeholderTextColor='#FFFFFF' />
            </View>
            <View style={[styles.textInputWrapper, {flexDirection:'row'}]}>
              <TextInput style={styles.textInput} placeholder="Password" onChangeText={(text) => {
                this.setState({ 
                  password: text,
                  passwordValid: Validator.passwordString(text)
                });
              }} value={ this.state.password } placeholderTextColor='#FFFFFF' secureTextEntry={this.state.secure} keyboardType={'default'} />
              <TouchableOpacity onPress={() => {
                this.setState((prevState) => {
                  return {
                    secure: !prevState.secure,
                  }
                });
              }}>
                <Image style={styles.passwordViewIcon} source={require(assetDir + '/images/password-white-eye-icon/password-white-eye-icon.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => {

              //Send login request to server
              if(this.state.emailValid && this.state.passwordValid)
              {
                let body = {
                  email: this.state.email,
                  password: this.state.password,
                  token: '',
                  login_chef_user: '',
                };
                if(this.props.navigation.state.params.role == "customer") {
                  body = {
                    email: this.state.email,
                    password: this.state.password,
                    token: '',
                    login_customer_user: '',
                  };
                }
                Ajax.fetchRequest({
                  method: 'POST',
                  body: body,
                  endpoint: '',
                }).then((response) => {

                  if(Ajax.checkResponse(response))
                  {
                    //temp.. should already have user ready to save from response
                    //parse user from response
                    const returnData = response.return_data;
                    let user = {
                      id: returnData.id,
                      rating: 0,
                      role: this.props.navigation.state.params.role,
                      name: returnData.name,
                      email: returnData.email,
                      phoneNumber: returnData.phone_number,
                      profile: { uri:returnData.profile_picture_base_64 },
                      token: returnData.token,
                      location: {
                        home: {
                          name: returnData.home_address,
                          lat: returnData.home_address_lat,
                          lon: returnData.home_address_lng,
                        },
                        work: {
                          name: returnData.work_address,
                          lat: 0,
                          lon: 0,
                        },
                      },
                      bank: {
                        name: '',
                        institution: '',
                        branch: '',
                        account: '',
                      },
                      certificate: {
                        dateIssed: '',
                        espIssed: '',
                        certImgSrc: '',
                        location: {
                          name: 'Place Certificate Signed',
                          lat: 0,
                          lon: 0,
                        },
                      },
                      wallet: {
                        depositCycle: '',
                        amount: 0,
                        cps: 0,
                        rtd: 0,
                      },
                    };

                    if(this.props.navigation.state.params.role == "chef") {
                      user = {
                        id: returnData.id,
                        rating: 0,
                        role: this.props.navigation.state.params.role,
                        name: returnData.name,
                        email: returnData.email,
                        phoneNumber: returnData.phone_number,
                        profile: { uri:returnData.profile_picture_base_64 },
                        token: returnData.token,
                        location: {
                          home: {
                            name: returnData.home_address,
                            lat: returnData.home_address_lat,
                            lon: returnData.home_address_lng,
                          },
                          work: {
                            name: returnData.work_address,
                            lat: 0,
                            lon: 0,
                          },
                        },
                        bank: {
                          name: returnData.bank_name,
                          institution: returnData.bank_inst,
                          branch: returnData.bank_branch,
                          account: returnData.bank_account_number,
                        },
                        certificate: {
                          dateIssed: returnData.cert_date_issued,
                          espIssed: returnData.cert_esp_date,
                          certImgSrc: { uri:returnData.cert_image_base_64 },
                          location: {
                            name: 'Place Certificate Signed',
                            lat: 0,
                            lon: 0,
                          },
                        },
                        wallet: {
                          depositCycle: returnData.deposit_cycle,
                          amount: returnData.wallet,
                          cps: 0,
                          rtd: 0,
                        },
                      };
                    }
                    //temp

                    //Set user
                    User.setUser(user);
                    if(user != null)
                    {
                      if(user.role == "chef")
                      {
                        //Add dishes
                        Dish.setDish(returnData.menu_items);

                        //Add drinks
                        Drink.setDrinks(returnData.drinks);

                        //Add orders
                        Order.setOrders(returnData.orders);
                      }
                      else if(user.role == "customer")
                      {
                        
                      }
                      

                      this.props.screenProps.login(user);
                    }  
                    else 
                    {
                      //Failed to save user
                      //..
                    }
                  }
                  else
                  {
                    //Error with response
                    //..
                  }
                  
                });
              }

            }}>
              <Text style={styles.button} >SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },

  scrollView: {
    flex: 1,
    justifyContent: "center",
  },

  s1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },


  image: {
    width: 150,
    resizeMode: 'contain',
  },

  s2: {
    flex: 2,
  },

  s2_1: {
    flex: 1,
  },

  textInputWrapper: {
    height: 50,
    marginTop: 10,
  },

  textInput: {
    flex: 1,
    color: '#FFFFFF',
  },

  buttonWrapper: {
    height: 55,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9333D',
  },

  button: {
    color: '#FFFFFF',
  },

  passwordViewIcon: {
    opacity: 0.5,
    width: 50,
    resizeMode: 'contain',
  },

});

module.exports = Login;
