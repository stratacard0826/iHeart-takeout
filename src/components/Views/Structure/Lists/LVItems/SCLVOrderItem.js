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
import Rating from '../../../../../../src/components/Views/Structure/Widgets/Rating';

class LVOrderItem extends React.Component {

  //
  constructor(props) {
    super(props);

    this.state = {

    };

    this.segueRightIconComponent.bind(this);
  }

  //Custom components
  segueRightIconComponent()
  {
    if(this.props.hasSegue)
    {
      return <Image style={styles.segueIcon} source={require(assetDir + '/images/segue-right-icon/segue-right-icon.png')} />
    }
    else {
      return <View style={styles.segueIconPlaceHolder} ></View>
    }
  }


  render() {

    const { separator, options } = this.props;

    let separatorBorder = {};
    if(separator) {
      separatorBorder = { borderBottomWidth: 0.5, borderBottomColor:'#F1F1F2' };
    }

    return (
      <TouchableOpacity style={[styles.container, separatorBorder, options.container]} onPress={this.props.onPress}>
        <View style={styles.rowWrapper}>
          <Image style={styles.image} source={this.props.order.user.profile} />
          <View style={styles.contentColumnWrapper}>
            <Text style={[styles.title, options.title]}>{this.props.order.user.name}</Text>
            <Text>Orders: {this.props.order.dishes.length}</Text>
            <Rating score={parseInt(this.props.order.user.rating)} />
          </View>
          { this.segueRightIconComponent() }
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },

  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  contentColumnWrapper: {
    flex: 1,
  },


  title: {
    flex: 1,
  },

  image: {
    width: 140,
    height: 140,
    backgroundColor: 'green',
    resizeMode: 'cover',
  },

  segueIcon: {
    width: 10,
    resizeMode: 'contain',
  },

  segueIconPlaceHolder: {
  },
});

module.exports = LVOrderItem;
