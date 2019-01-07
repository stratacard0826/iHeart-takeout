import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
 } from 'react-native';

const assetDir = '../../../../../../assets';

import Global from '../../../../../../src/global.js';


class LVInputItem extends React.Component {

  //
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      secure: props.secure,
    };

    this.passwordEyeIconComponent.bind(this);
    this.segueRightIconComponent.bind(this);
  }

  //Custom components
  passwordEyeIconComponent()
  {
    if(this.props.secure)
    {
      console.log("passwordEyeIconComponent(): Password Icon Functions Loaded");
      return (
        <TouchableOpacity onPress={() => {
          this.setState((prevState) => {
            return {
              secure: !prevState.secure,
            }
          });
        }}>
          <Image style={gstyles.passwordViewIcon} source={require(assetDir + '/images/password-eye-icon/password-eye-icon.png')} />
        </TouchableOpacity>
      )
    }
  }

  segueRightIconComponent()
  {
    if(this.props.hasSegue)
    {
      return <Image style={gstyles.segueIcon} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
    }
    else {
      return <View style={gstyles.segueIconPlaceHolder} ></View>
    }
  }


  render() {

    const { separator, options } = this.props;

    let separatorBorder = {  };
    if(separator) {
      separatorBorder = { borderBottomWidth: 0.5, borderBottomColor:'#F1F1F2' };
    }

    return (
      <View style={[gstyles.container, separatorBorder, options.container]}>
        <View style={gstyles.rowWrapper}>
          <View style={gstyles.contentColumnWrapper}>
            <Text style={gstyles.title}>{this.props.title}</Text>
            <View style={gstyles.textInputWrapper}>
              <TextInput style={gstyles.textInput} placeholder={this.props.placeholder} placeholderTextColor={this.props.placeholderTextColor} onChangeText={(text) => {
                this.setState({ value: this.props.validator(text) });
              }} value={ this.state.value } secureTextEntry={this.state.secure} keyboardType={this.props.keyboardType} underlineColorAndroid={'#F16522'}  />
              { this.passwordEyeIconComponent() }
            </View>
          </View>
          { this.segueRightIconComponent() }
        </View>
      </View>
    );
  }
}


const gstyles = StyleSheet.create(Global.LVInputItem());

module.exports = LVInputItem;
