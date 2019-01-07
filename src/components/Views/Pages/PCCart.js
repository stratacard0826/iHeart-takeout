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

import LVDishItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVDishItem';
import LVListItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVListItem';
import LVInputItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVInputItem';
import LVList from '../../../../src/components/Views/Structure/Lists/SCLVList';

import Validator from '../../../../src/util/validator.js';
import Global from '../../../../src/global.js'
import Debug from '../../../../src/util/debug.js';
import User from '../../../../src/modals/user/user.js';
import Dish from '../../../../src/modals/menu/dish/dish.js';
import CartItems from '../../../../src/modals/order/order.js';


class Cart extends React.Component {

  //Funcs
  resetState = () => {

    console.log("resetState");
    this.setState((prevState) => {
      return {
        ...prevState,
        refreshState: prevState.refreshState + 1,
      };
    });
  }


  //
  constructor(props) {
    super(props);

    console.log("class PCCart");
    const user = props.user;

    CartItems.getOrders(user, props.cartOrders).then(({loaded, state}) => {

      let items = [];
      if(state != null)
      {
        items = state;
      }
      else if(loaded != null)
      {
        //Set items
        for(let key in loaded)
        {
          const responseObj = loaded[key];

          //Add dish owner (user) //.. this is temp done on client till api returns user in response object
          let dishUser = {
            id: responseObj.chef_id,
            rating: 3,
            role: 'chef',
            name: responseObj.name,
            email: null,
            phoneNumber: null,
            profile: null,
            location: {
              home: {
                name: responseObj.home_address,
                lat: responseObj.lat,
                lon: responseObj.lng,
              },
              work: {
                name: null,
                lat: null,
                lon: null,
              },
            }
          };

          for(let index in responseObj.cart_items)
          {
            let dishObj = responseObj.cart_items[index];
            //dishObj.itm_image_path = 'https://pinecone.info/assets/images/logo.png';

            let newDish = {
              ...dishObj,
              user: dishUser,
            }

            items.push({
              dish: newDish,
              component: (options) => { return (
                <View style={styles.cartOrderContainer}>
                  <LVDishItem dish={newDish} separator={true} onPress={() => {
                    //On item selection
                    //..
                  }} options={{
                    container: {
                      ...options.container,
                    }
                  }} />
                  <TouchableOpacity style={styles.checkoutButton} onPress={() => {
                    //Navigate to checkout page
                    //..
                  }}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                  </TouchableOpacity>
                </View> );
              }
            });
          }
        }

        //Recreate first & last item to add marginBottom & marginTop to last item in list
        if(items.length > 0)
        {
          items[0] = {
            dish: items[0].dish,
            component: (options) => { return (
              <View style={[styles.cartOrderContainer, {marginTop: 60}]}>
                <LVDishItem dish={items[0].dish} separator={true} onPress={() => {
                  //On item selection
                  //..
                }} options={{
                  container: {
                    ...options.container,
                  }
                }} />
                <TouchableOpacity style={styles.checkoutButton} onPress={() => {
                  //Navigate to checkout page
                  //..
                }}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </View> );
            }
          };

          items[items.length-1] = {
            dish: items[items.length-1].dish,
            component: (options) => { return (
              <View style={[styles.cartOrderContainer, {marginTop:(items.length == 1 ?  60 : 0), marginBottom:105}]}>
                <LVDishItem dish={items[items.length-1].dish} separator={true} onPress={() => {
                  //On item selection
                  //..
                }} options={{
                  container: {
                    ...options.container,
                  }
                }} />
                <TouchableOpacity style={styles.checkoutButton} onPress={() => {
                  //Navigate to checkout page
                  //..
                }}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </View> );
            }
          };

          //Set dishes to this.state
          this.props.saveToState({_cartOrders:items});
        }


      }

      this.setState({
        listItems: items,
      });

    });


    this.state = {
      user: user,
      listItems: [],
      refreshState: 0,
    };

    this.resetState.bind(this);
  }

  render() {

    const { options } = this.props;
    console.log("PC Home Dish Feed OPTIONS: " + JSON.stringify(options));

    return (
      <View style={[styles.container, options.container]}>
        <FlatList key={this.state.refreshState} ref={scrollView => { this._flatList = scrollView; }} style={styles.flatlist} data={this.state.listItems} renderItem={({item}) => {

          return (
            item.component({
              container: {
                marginBottom: 0,
              }
            })
          );
        }} showsVerticalScrollIndicator={false} keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FEFEFE',
  },

  flatlist: {
  },

  cartOrderContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#FAFAFA',
    borderLeftWidth: 1,
    borderLeftColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#FAFAFA',
    borderRadius: 4,
    marginBottom: 0,
  },

  checkoutButton: {
    flex: 1,
    backgroundColor: '#8AB560',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomColor: '#8A8A7F',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,

  },

  checkoutText: {
      color: '#FFFFFF',
      fontSize: 16,
  },

});


module.exports = Cart;
