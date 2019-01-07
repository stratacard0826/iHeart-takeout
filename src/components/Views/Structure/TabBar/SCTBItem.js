import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
 } from 'react-native';

const assetDir = '../../../../../assets';


class TBItem extends React.Component {

  //
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    const { selected, imageIconSrc } = this.props;

    let indicator = { };
    let selectedIndicator = { };
    if(selected) {
      indicator = { borderWidth: 1.5, };
      selectedIndicator = { width:35, height:35 };
    }

    return (
      <TouchableOpacity style={[styles.container, indicator]} onPress={() => {
        if(this.props.onPress.prevSelected != this.props.onPress.selected) {
          this.props.onPress.func(this.props.onPress.prevSelected, this.props.onPress.selected);
        }
      }}>
          <Image style={[styles.imageIcon, selectedIndicator]} source={imageIconSrc} />
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    borderTopColor: '#808284',
    borderRadius: 3,
  },

  imageIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },

});

module.exports = TBItem;
