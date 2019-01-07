import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
 } from 'react-native';


const assetDir = '../../../assets';

import TBFLMain from '../../../src/components/Views/Structure/TabBar/SCTBFLMain';
import TBItem from '../../../src/components/Views/Structure/TabBar/SCTBItem';

import UserProfile from '../../../src/components/Views/Pages/PCSignup';
import HomeFeed from '../../../src/components/Views/Pages/PCHomeFeed';
import Order from '../../../src/components/Views/Pages/PCOrder';
import Cart from '../../../src/components/Views/Pages/PCCart';
import Dish from '../../../src/components/Views/Pages/PCDish';
import Drink from '../../../src/components/Views/Pages/PCDrink';
import User from '../../../src/modals/user/user.js';


class TBController extends React.Component {

  //Funcs
  resetState = () => {
    this.setState((prevState) => {
      return { 
        refreshState: prevState.refreshState + 1 
      };
    });
  }

  onTabBarItemPressed = (prevIndex, index) => {

    if(prevIndex != index)
    {
      //Set selected tab
      let items = this.state.renderItems;
      for(i=0; i<items.length; i++)
      {
        items[i] = {
          ...items[i],
          selected: (index == i),
          prevSelected: prevIndex,
        };
      }

      //Refresh TBFLMain state to refresh selected View
      this.setState((prevState) => {
        return {
          stateCache: {
            initialView: prevState.stateCache.initialView,
            targetView: index,
          },
          renderItems: items,
          user: prevState.user,
          refreshState: prevState.refreshState + 1,
        };
      });
     }
  }


  updateInitialView = () => {

    //Update initial view value
    this.setState((prevState) => {
      return {
        stateCache: {
          initialView: prevState.stateCache.targetView,
          targetView: prevState.stateCache.targetView,
        }
      };
    });
  }


  saveToState = ({_dishes, _cartOrders, _orders}) => {

    if(_dishes) {
      console.log("SAVE STATE DISHES");
    } else if(_cartOrders) {
      console.log("SAVE STATE CART ORDERS");
    }

    this.setState((prevState) => {
      return {
        dishes: (_dishes ? _dishes :  prevState.dishes),
        cartOrders: (_cartOrders ? _cartOrders :  prevState.cartOrders),
        orders: (_orders ? _orders :  prevState.orders),
      };
    });
  }


  //
  constructor(props) {
    super(props);

    //Get user
    console.log("class TBController ");
    console.log("props " + JSON.stringify(props));

    let renderItems = [];
    const user = props.screenProps.user;
    if(user == null) {
      //User is required.. log user out
      props.screenProps.logout();
    } else {
      console.log("Rending items");
      if(user.role == 'chef')
      {
        renderItems = [
          {
            title: 'Profile',
            selected: true,
            imageIconSrc: require(assetDir + '/images/home-icon/home-icon.png'),
            component: (options) => { return <UserProfile key={'chef_profile'} user={user} options={options} />},
          },
          {
            title: 'Orders',
            selected: false,
            imageIconSrc: require(assetDir + '/images/orders-icon/orders-icon.png'),
            component: (options) => { return <Order key={'chef_orders'} saveToState={this.saveToState} user={user} orders={this.state.orders} options={options} />},
          },
          {
            title: 'Dish',
            selected: false,
            imageIconSrc: require(assetDir + '/images/dish-icon/dish-icon.png'),
            component: (options) => { return <Dish key={'chef_dish'} user={user} options={options} />},
          },
          {
            title: 'Drink',
            selected: false,
            imageIconSrc: require(assetDir + '/images/drink-icon/drink-icon.png'),
            component: (options) => { return <Drink key={'chef_drink'} user={user} options={options} />},
          },
          {
            title: 'Menu',
            selected: false,
            imageIconSrc: require(assetDir + '/images/menu-icon/menu-icon.png'),
            component: (options) => { return <Dish key={'chef_menu'} saveToState={this.saveToState} user={user} options={options} />},
          },
        ];
      }
      else if(user.role == 'customer')
      {
        renderItems = [
          {
            title: 'Home Feed',
            selected: true,
            imageIconSrc: require(assetDir + '/images/home-icon/home-icon.png'),
            component: (options) => { return <HomeFeed key={'customer_home_feed'} saveToState={this.saveToState} user={user} dishes={this.state.dishes} options={options} />},
          },
          {
            title: 'Cart',
            selected: false,
            imageIconSrc: require(assetDir + '/images/cart-icon/cart-icon.png'),
            component: (options) => { return <Cart key={'customer_cart'} saveToState={this.saveToState} user={user} cartOrders={this.state.cartOrders} options={options} />},
          },
          {
            title: 'Orders',
            selected: false,
            imageIconSrc: require(assetDir + '/images/orders-icon/orders-icon.png'),
            component: (options) => { return <Dish key={'customer_orders'} saveToState={this.saveToState} user={user} options={options} />},
          },
          {
            title: 'Profile',
            selected: false,
            imageIconSrc: require(assetDir + '/images/cog-icon/cog-icon.png'),
            component: (options) => { return <UserProfile key={'customer_profile'} user={user} options={{...options, profileItemContainer:{marginTop:70},}} />},
          },
        ];
      }
    }

    this.state = {
      refreshState: 1,
      renderItems: renderItems,
      dishes: [],
      cartOrders: [],
      stateCache: {

        //Tabbar navigation cache
        initialView: 0,
        targetView: 0,
      },
    };

    this.resetState.bind(this);
    this.onTabBarItemPressed.bind(this);
    this.updateInitialView.bind(this);
    this.saveToState.bind(this);
  }

  render() {

    return (
      <View style={styles.container}>

          <TBFLMain key={this.state.refreshState} renderItems={this.state.renderItems} refreshState={this.resetState}  stateCache={this.state.stateCache} updateInitialView={this.updateInitialView} />
          <View style={styles.wrapper}>
            {
              this.state.renderItems.map((item, index, array) => {


                return (
                    //Note: May passing the item component as a prop to be rendered by the tabbar tab... behaviour sorta like a television changing stations
                    <TBItem key={item.title} selected={item.selected} imageIconSrc={item.imageIconSrc} onPress={{prevSelected:this.state.stateCache.initialView, selected:index, func:this.onTabBarItemPressed }} />
                );
              })
            }
          </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },

  wrapper: {
    margin: 15,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#F6F7F9',
    borderTopColor: '#EDECED',
    backgroundColor: 'rgba(255,255,255, 0.9)'//'rgba(246,247,249, 0.95)',
  },

  options: {
    flex: 1,
    backgroundColor: 'red',
  },

});

module.exports = TBController;
