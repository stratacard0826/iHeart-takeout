import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
 } from 'react-native';

const assetDir = '../../../../../../assets';
import Rating from '../../../../../../src/components/Views/Structure/Widgets/Rating';
import User from '../../../../../../src/modals/user/user.js';
import Dish from '../../../../../../src/modals/menu/dish/dish.js';
import Global from '../../../../../../src/global.js';

class LVDishItem extends React.Component {

  //
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  //Custom components
  //..


  render() {

    const { options, dish } = this.props;

    let separatorBorder = { };
    if(this.props.separator) {
      separatorBorder = { borderBottomWidth: 0.5, borderBottomColor:'#F1F1F2' };
    }

    return (
      <TouchableOpacity style={[styles.container, separatorBorder, options.container]} onPress={this.props.onPress}>
        <View style={styles.chefInfoContainer}>
          <Text style={styles.chefName}>{dish.user.name}</Text>
          <View style={styles.chefSubInfoContainer}>
            <Rating score={dish.user.rating} />
            <Text style={styles.dishDistance}>distance</Text>
          </View>
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri:dish.itm_image_path }} style={styles.image} />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.dishName}>{dish.itm_name}</Text>
            <Text style={styles.dishDesc}>{dish.itm_desc}</Text>
            <View style={styles.dishPriceDetailsContainer}>
              <Text style={styles.dishPrice}>{Dish.getDishPrice(dish.itm_price)}</Text>
              <Text style={styles.dishPoints}>{Dish.getDishPoints(dish.itm_price)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  chefInfoContainer: {
    flex:1,
    padding: 15,
  },

  chefName: {
    flex: 1,
    fontSize: 20,
  },

  chefSubInfoContainer: {
    flexDirection: 'row',
  },

  dishDistance: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    color: '#939597',
  },

  imageContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#58585B',
  },

  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 250,
    resizeMode: 'cover',
  },

  descriptionContainer: {
    flex: 1,
    padding: 15,
  },

  dishName: {
    flex: 1,
    fontSize: 20,
    marginBottom: 10,
    color: '#EE393A',
  },

  dishDesc: {
    flex: 1,
  },

  dishPriceDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#F48666',
    marginTop: 10,
    paddingTop: 10,
  },

  dishPrice: {
    flex: 1,
    fontSize: 22,
    color: '#EE393A',
  },

  dishPoints: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 16,
    color: '#EE393A',
  },

});

module.exports = LVDishItem;
