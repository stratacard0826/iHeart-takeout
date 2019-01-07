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

import LVOrderItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVOrderItem';
import LVListItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVListItem';
import LVInputItem from '../../../../src/components/Views/Structure/Lists/LVItems/SCLVInputItem';
import LVList from '../../../../src/components/Views/Structure/Lists/SCLVList';

import Validator from '../../../../src/util/validator.js';
import Global from '../../../../src/global.js'
import Debug from '../../../../src/util/debug.js';
import User from '../../../../src/modals/user/user.js';
import Dish from '../../../../src/modals/menu/dish/dish.js';
import OrderItems from '../../../../src/modals/order/order.js';


class Order extends React.Component {

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

    const user = props.user;
    OrderItems.getOrders(user, props.orders).then(({loaded, state}) => {

      let items = [];
      if(state != null)
      {
        items = state;
      }
      else if(loaded != null)
      {
        //Set items
        console.log("RANN");
        for(let i=0; i<loaded.length; i++)
        {
          const responseObj = loaded[i];

          //Add dish owner (user) //.. this is temp done on client till api returns user in response object
          let dishUser = {
            id: responseObj.customer_id,
            rating: responseObj.rating,
            role: 'customer',
            name: responseObj.name,
            email: null,
            phoneNumber: null,
            profile: { uri:responseObj.profile_image_path },
            location: {
              home: {
                name: responseObj.home_address,
                lat: responseObj.home_lat,
                lon: responseObj.home_lng,
              },
              work: {
                name: null,
                lat: null,
                lon: null,
              },
            }
          };


          //dishObj.itm_image_path = 'https://pinecone.info/assets/images/logo.png';

          let newOrder = {
            user: dishUser,
            dishes: responseObj.items,
          }

          items.push({
            order: newOrder,
            component: (options) => { return (
                <LVOrderItem order={newOrder} separator={true} hasSegue={false} onPress={() => {
                  //On item selection
                  //..
                }} options={options} />);
            }
          });
        }

        //Recreate first & last item to add marginBottom & marginTop to last item in list
        if(items.length > 0)
        {
          items[0] = {
            order: items[0].order,
            component: (options) => { return (
              <LVOrderItem order={items[0].order} separator={true} hasSegue={false} onPress={() => {
                  //On item selection
                  //..
                }} options={{
                container: {
                  ...options.container,
                  marginTop: 60,
              }}} /> );
            }
          };

          items[items.length-1] = {
            order: items[items.length-1].order,
            component: (options) => { return (
              <LVOrderItem order={items[items.length-1].order} separator={true} hasSegue={false} onPress={() => {
                  //On item selection
                  //..
                }} options={{
                container: {
                  ...options.container,
                  marginTop:(items.length == 1 ?  60 : 0),
                  marginBottom: 105,
                }
              }} />);
            }
          };

          //Set dishes to this.state
          this.props.saveToState({_orders:items});
        }
      }

      console.log("Orders " + JSON.stringify(items));
      this.setState({
        listItems: items,
      });

    });


    this.state = {
      listItems: [],
      refreshState: 0,
    };

    this.resetState.bind(this);
  }

  render() {

    const { options } = this.props;

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

});


module.exports = Order;
