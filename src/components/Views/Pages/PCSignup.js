import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
 } from 'react-native';


const assetDir = '../../../../assets';

import Header from '../../../../src/components/Views/Structure/Headers/SCHeader';
import LVInputItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVInputItem';
import LVListItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVListItem';
import LVPaginatedItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVPaginatedItem';
import LVFooterItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVFooterItem';

import Validator from '../../../../src/util/validator.js';
import Global from '../../../../src/global.js'
import Debug from '../../../../src/util/debug.js';
import User from '../../../../src/modals/user/user.js';


class Signup extends React.Component {

  //Funcs
  resetState = (page) => {

    console.log("resetState");
    this.setState((prevState) => {
      return {
        ...prevState,
        listItems: this.refreshItems(page, prevState.user),
        refreshState: prevState.refreshState + 1,
      };
    });
  }

  refreshItems = (page, user) => {

    let items = [];
    if(page == "profile")
    {
      items = [
        {
          title: 'Profile',
          component: (options) => {
            return (
              <TouchableOpacity style={[styles.profileItemContainer, options.container]} onPress={() => {

                //Get image picker controller
                //..
              }}>
                <Image style={styles.profileItemImg} source={user.profile} />
                <Text style={styles.uploadProfileImgText}>Upload Profile Picture</Text>
              </TouchableOpacity>
            );
          }
        },
        {
          title: 'Name',
          value: user.name,
          component: (options) => { return <LVInputItem title={'Name'} value={user.name} placeholder={'Name'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Email',
          value: user.email,
          component: (options) => { return <LVInputItem title={'Email'} value={user.email} placeholder={'Email'} placeholderTextColor={'#9A9A9A'} validator={Validator.emailString} secure={false} keyboardType='email-address' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Password',
          value: '',
          component: (options) => { return (
              <LVInputItem title={'Password'} value={''} placeholder={''} placeholderTextColor={'#9A9A9A'} validator={Validator.passwordString} secure={true} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} />
          ); }
        },
        {
          title: 'Phone Number',
          value: user.phoneNumber,
          component: (options) => { return <LVInputItem title={'Phone Number'} value={user.phoneNumber} placeholder={'416-123-4567'} placeholderTextColor={'#9A9A9A'} validator={Validator.phoneNumberString} secure={false} keyboardType='phone-pad' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Home Address',
          component: (options) => {
            return (
              <View style={[gstyles.container, options.container]}>
                <View style={gstyles.rowWrapper}>
                  <View style={gstyles.contentColumnWrapper}>
                    <TouchableOpacity style={[gstyles.textInputWrapper, styles.homeAddressWrapper]} onPress={() => {

                      //Google location lat lon
                      //..
                    }}>
                      <Text style={[gstyles.textInput, styles.textInput]}>{user.location.home.name}</Text>
                      <Image style={[gstyles.passwordViewIcon, styles.locationIcon]} source={require(assetDir + '/images/location-icon/grey-location-icon.png')} />
                    </TouchableOpacity>
                  </View>
                  <Image style={[gstyles.segueIcon, styles.segueIcon]} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
                </View>
              </View>
            );
          }
        },
        {
          title: 'Paginated Item',
          component: (options) => {
            return <LVPaginatedItem nextPage={{ title:'Bank.. ', onPress:() => {
              this.resetState('bank');
            }}} prevPage={false} separator={true} nextEnabled={true} prevEnabled={false} options={{container:[options.container, {borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:20 }]}} user={user} />
          }
        },
        {
          title: 'Update Data',
          value: user,
          component: (options) => { return (
              <LVListItem title={'Update'} onPress={this.submitDataItemPressed} separator={true} hasSegue={false} options={{container:[options.container, {borderRadius:3, borderBottomWidth:2, borderBottomColor:'#006738', marginBottom:105, backgroundColor:'#009344' }], title:{alignSelf:'center', color:'#FFFFFF'}}} user={user} />
          ); }
        },
      ];
    }
    else if(page == "bank")
    {
      items = [
        {
          title: 'Bank Name',
          value: user.bank.name,
          component: (options) => { return <LVInputItem title={'Bank Name'} value={user.bank.name} placeholder={'Name of Bank'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={{container:[options.container, styles.profileItemContainer]}} user={user} /> }
        },
        {
          title: 'Bank Institution',
          value: user.bank.institution,
          component: (options) => { return <LVInputItem title={'Bank Institution'} value={user.bank.institution} placeholder={'Institution'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Branch',
          value: user.bank.branch,
          component: (options) => { return (
              <LVInputItem title={'Branch'} value={user.bank.branch} placeholder={'Bank Branch'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} />
          ); }
        },
        {
          title: 'Account',
          value: user.bank.account,
          component: (options) => { return <LVInputItem title={'Account'} value={user.bank.account} placeholder={'Account #'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Paginated Item',
          component: (options) => {
            return <LVPaginatedItem nextPage={{ title:'Certificates.. ', onPress:() => {
              this.resetState('cert');
            }}} prevPage={{ title:' ..Profile', onPress:() => {
              this.resetState('profile');
            }}} separator={false} nextEnabled={true} prevEnabled={true} options={{container:[options.container, {borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:20 }]}} user={user} />
          }
        },
        {
          title: 'Update Data',
          value: user,
          component: (options) => { return (
              <LVListItem title={'Update'} onPress={this.submitDataItemPressed} separator={true} hasSegue={false} options={{container:[options.container, {borderRadius:3, borderBottomWidth:2, borderBottomColor:'#006738', marginBottom:105, backgroundColor:'#009344' }], title:{alignSelf:'center', color:'#FFFFFF'}}} user={user} />
          ); }
        },
      ];
    }
    else if(page == "cert")
    {
      items = [
        {
          title: 'Date Issued',
          value: user.certificate.dateIssed,
          component: (options) => { return <LVInputItem title={'Date Issued'} value={user.certificate.dateIssued} placeholder={'Date Issued'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={{container:[options.container, styles.profileItemContainer]}} user={user} /> }
        },
        {
          title: 'Esp Date',
          value: user.certificate.espDate,
          component: (options) => { return <LVInputItem title={'Esp Date'} value={user.certificate.espDate} placeholder={'Esp Date'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Placed Issed',
          component: (options) => {
            return (
              <View style={[gstyles.container, options.container]}>
                <View style={gstyles.rowWrapper}>
                  <View style={gstyles.contentColumnWrapper}>
                    <TouchableOpacity style={[gstyles.textInputWrapper, styles.homeAddressWrapper]} onPress={() => {

                      //Google location lat lon
                      //..
                    }}>
                      <Text style={[gstyles.textInput, styles.textInput]}>{user.certificate.location.name}</Text>
                      <Image style={[gstyles.passwordViewIcon, styles.locationIcon]} source={require(assetDir + '/images/location-icon/grey-location-icon.png')} />
                    </TouchableOpacity>
                  </View>
                  <Image style={[gstyles.segueIcon, styles.segueIcon]} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
                </View>
              </View>
            );
          }
        },
        {
          title: 'Paginated Item',
          component: (options) => {
            return <LVPaginatedItem nextPage={{ title:'Wallet.. ', onPress:() => {
              this.resetState('wallet');
            }}} prevPage={{ title:' ..Bank', onPress:() => {
              this.resetState('bank');
            }}} separator={true} nextEnabled={true} prevEnabled={true} options={{container:[options.container, {borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:20 }]}} user={user} />
          }
        },
        {
          title: 'Update Data',
          value: user,
          component: (options) => { return (
              <LVListItem title={'Update'} onPress={this.submitDataItemPressed} separator={true} hasSegue={false} options={{container:[options.container, {borderRadius:3, borderBottomWidth:2, borderBottomColor:'#006738', marginBottom:105, backgroundColor:'#009344' }], title:{alignSelf:'center', color:'#FFFFFF'}}} user={user} />
          ); }
        },
      ];
    }
    else if(page == "wallet")
    {
      items = [
        {
          title: 'Wallet',
          value: user.wallet.amount,
          component: (options) => { return <LVInputItem title={'Wallet'} value={"$" + user.wallet.amount} placeholder={'Amount'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={{container:[options.container, styles.profileItemContainer]}} user={user} /> }
        },
        {
          title: 'Deposit Cycle',
          value: user.wallet.depositCycle,
          component: (options) => { return <LVInputItem title={'Deposit Cycle'} value={user.wallet.depositCycle} placeholder={'Deposit Cycle'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Revenew to Date',
          value: user.wallet.rtd,
          component: (options) => { return (
              <LVInputItem title={'Branch'} value={"$" + user.wallet.rtd} placeholder={'Revenew to Date'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} />
          ); }
        },
        {
          title: 'Current Period Sales',
          value: user.wallet.cps,
          component: (options) => { return <LVInputItem title={'Current Period Sales'} value={"$" + user.wallet.cps} placeholder={'Current Period Sales'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Paginated Item',
          component: (options) => {
            return <LVPaginatedItem nextPage={false} prevPage={{ title:' ..Certificates', onPress:() => {
              this.resetState('cert');
            }}} separator={true} nextEnabled={false} prevEnabled={true} options={{container:[options.container, { borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:20 }]}} user={user} />
          }
        },
        {
          title: 'Update Data',
          value: user,
          component: (options) => { return (
              <LVListItem title={'Update'} onPress={this.submitDataItemPressed} separator={true} hasSegue={false} options={{container:[options.container, {borderRadius:3, borderBottomWidth:2, borderBottomColor:'#006738', marginBottom:105, backgroundColor:'#009344' }], title:{alignSelf:'center', color:'#FFFFFF'} }} user={user} />
          ); }
        },
        /*{
          component: (options) => {
            return (
              <LVFooterItem copyright={'Takeout Inc.'} separator={true} options={[{borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:105 }, options]} user={user} />
            );
          }
        },*/
      ];
    }

    return items;
  }


  submitDataItemPressed = () => {

    //Submit data to server
    //..
    console.log("User has been updated");

    //temp
    this.props.screenProps.goToTest(this.props.navigation.state.params.role);
    //temp
  }

  //
  constructor(props) {
    super(props);

    let user = props.user;
    if(user == null) {
      user = User.getEmptyUserObject();
      user.role = props.navigation.state.params.role;
    }


    let items = [];
    if(user.role == "chef")
    {
      items = this.refreshItems('profile', user);
    }
    else if(user.role == "customer")
    {
      items = [
        {
          title: 'Profile',
          component: (options) => {

            const _options = props.options;
            if(_options == null) {
              profileItemContainer = this.props.navigation.state.params.options.profileItemContainer;
            } else {
              profileItemContainer = options.profileItemContainer;
            }

            return (
              <TouchableOpacity style={[styles.profileItemContainer, profileItemContainer, options.container]} onPress={() => {

                //Get image picker controller
                //..
              }}>
                <Image style={styles.profileItemImg} source={user.profile} />
                <Text style={styles.uploadProfileImgText}>Upload Profile Picture</Text>
              </TouchableOpacity>
            );
          }
        },
        {
          title: 'Name',
          value: user.name,
          component: (options) => { return <LVInputItem title={'Name'} value={user.name} placeholder={'Name'} placeholderTextColor={'#9A9A9A'} validator={Validator.regString} secure={false} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Email',
          value: user.email,
          component: (options) => { return <LVInputItem title={'Email'} value={user.email} placeholder={'Email'} placeholderTextColor={'#9A9A9A'} validator={Validator.emailString} secure={false} keyboardType='email-address' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Password',
          value: '',
          component: (options) => { return (
              <LVInputItem title={'Password'} value={''} placeholder={''} placeholderTextColor={'#9A9A9A'} validator={Validator.passwordString} secure={true} keyboardType='default' separator={true} hasSegue={false} options={options} user={user} />
          ); }
        },
        {
          title: 'Phone Number',
          value: user.phoneNumber,
          component: (options) => { return <LVInputItem title={'Phone Number'} value={user.phoneNumber} placeholder={'416-123-4567'} placeholderTextColor={'#9A9A9A'} validator={Validator.phoneNumberString} secure={false} keyboardType='phone-pad' separator={true} hasSegue={false} options={options} user={user} /> }
        },
        {
          title: 'Home Address',
          component: (options) => {
            return (
              <View style={[gstyles.container, options.container, { borderBottomWidth: 0.5, borderBottomColor:'#F1F1F2' }]}>
                <View style={gstyles.rowWrapper}>
                  <View style={gstyles.contentColumnWrapper}>
                    <TouchableOpacity style={[gstyles.textInputWrapper, styles.homeAddressWrapper]} onPress={() => {

                      //Google location lat lon
                      //..
                    }}>
                      <Text style={[gstyles.textInput, styles.textInput]}>{user.location.home.name}</Text>
                      <Image style={[gstyles.passwordViewIcon, styles.locationIcon]} source={require(assetDir + '/images/location-icon/grey-location-icon.png')} />
                    </TouchableOpacity>
                  </View>
                  <Image style={[gstyles.segueIcon, styles.segueIcon]} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
                </View>
              </View>
            );
          }
        },
        {
          title: 'Work Address',
          component: (options) => {
            return (
              <View style={[gstyles.container, options.container]}>
                <View style={gstyles.rowWrapper}>
                  <View style={gstyles.contentColumnWrapper}>
                    <TouchableOpacity style={[gstyles.textInputWrapper, styles.homeAddressWrapper]} onPress={() => {

                      //Google location lat lon
                      //..
                    }}>
                      <Text style={[gstyles.textInput, styles.textInput]}>{user.location.work.name}</Text>
                      <Image style={[gstyles.passwordViewIcon, styles.locationIcon]} source={require(assetDir + '/images/location-icon/grey-location-icon.png')} />
                    </TouchableOpacity>
                  </View>
                  <Image style={[gstyles.segueIcon, styles.segueIcon]} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
                </View>
              </View>
            );
          }
        },
        {
          component: (options) => {
            return (
              <LVFooterItem copyright={'Takeout Inc.'} separator={true} options={{container:[{borderBottomWidth:2, borderBottomColor:'#F1F1F2', marginBottom:20}, options.container]}} user={user} />
            );
          }
        },
        {
          title: 'Submit Data',
          value: user,
          component: (options) => { return (
              <LVListItem title={'Submit'} onPress={this.submitDataItemPressed} separator={true} hasSegue={false} options={{container:[options.container, {borderRadius:3, borderBottomWidth:2, borderBottomColor:'#006738', borderRightColor:'#009344', marginBottom:105, backgroundColor:'#009344'}], title:{alignSelf:'center', color:'#FFFFFF'} }} user={user} />
          ); }
        },
      ];
    }

    this.state = {
      listItems: items,
      refreshState: 0,
    };

    this.resetState.bind(this);
    this.refreshItems.bind(this);
    this.submitDataItemPressed.bind(this);
  }

  render() {

    let { options } = this.props;
    if(options == null) {
      options = this.props.navigation.state.params.options;
    }
    console.log("LVSignup OPTIONS: " + JSON.stringify(options));

    return (
      <View style={[styles.container, options.container]}>
        <FlatList key={this.state.refreshState} ref={scrollView => { this._flatList = scrollView; }} style={styles.flatlist} data={this.state.listItems} renderItem={({item}) => {

          return (
            item.component({container:{borderRightWidth: 1.5, borderRightColor: '#F1F1F2', borderBottomRightRadius:3}})
          );
        }} showsVerticalScrollIndicator={false}  keyExtractor={(item, index) => index.toString()}   />
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 8,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
  },

  flatlist: {
  },

  textInput: {
  },

  profileItemContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    borderTopWidth: 1,
    borderTopColor:'#F1F1F2'
  },

  profileItemImg: {
    height: 150,
    width: 150,
    padding: 5,
    marginBottom: 15,
    resizeMode: 'contain',
  },

  uploadProfileImgText: {
    color: '#1D9BF6'
  },


  homeAddressWrapper: {
    alignItems: 'center',
  },

  locationIcon: {
    height: 25,
  },

  segueIcon: {
    opacity: 0.5,
  },

  footerContainer: {
    borderBottomWidth:2,
    borderBottomColor:'#F1F1F2',
    marginBottom:105,
  },

});


const gstyles = StyleSheet.create(Global.LVInputItem(false));

module.exports = Signup;
