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


class HomeFeed extends React.Component {

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

    console.log("class PCHomeFeed");
    const user = props.user;

    Dish.getDishes(user, props.dishes).then(({loaded, state}) => {

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
            email: responseObj.email,
            phoneNumber: responseObj.phone_number,
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

          //
          let dishes = [];
          for(let index in responseObj.menu_items)
          {
            let dishObj = responseObj.menu_items[index];
            dishObj.itm_image_path = 'https://pinecone.info/assets/images/logo.png';

            let newDish = {
              ...dishObj,
              user: dishUser,
            }

            dishes.push({
              component: (options) => { return <LVDishItem dish={newDish} separator={true} onPress={() => {
                //On item selection
                //..
              }} options={options} /> }
            });
          }

          items.push({
            dishes: dishes,
            component: (options) => { return <LVList listItems={dishes} pagingEnabled={true} horizontal={true} scrollEnabled={true} options={options} /> }
          });
        }

        //Recreate first & last item to add marginBottom & marginTop to last item in list
        if(items.length > 0)
        {
          items[0] = {
            dishes: items[0].dishes,
            component: (options) => { return <LVList listItems={items[0].dishes} pagingEnabled={true} horizontal={true} scrollEnabled={true} options={{
                container: {
                  ...options.container,
                  marginTop: 60,
                }
              }} />
            }
          };

          items[items.length-1] = {
            dishes: items[items.length-1].dishes,
            component: (options) => { return <LVList listItems={items[items.length-1].dishes} pagingEnabled={true} horizontal={true} scrollEnabled={true} options={{
                container: {
                  ...options.container,
                  marginTop:(items.length == 1 ?  60 : 0),
                  marginBottom: 105,
                }
              }} />
            }
          };

          //Set dishes to this.state
          this.props.saveToState({_dishes:items});
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
  },

  flatlist: {
  },


});


module.exports = HomeFeed;
