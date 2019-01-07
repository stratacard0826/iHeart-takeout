import { AsyncStorage } from 'react-native';
import Ajax from '../../../src/util/ajax.js';

const asyncStorageModalId_order = '@TakeoutModal:order';


export default {

  async getOrders(user, _orders) {

    if(_orders != null && _orders.length > 0) {
      console.log("Orders of type retrieved: Item stored in state ");
      return {loaded:null, state:_orders}
    }

    //Check store
    try
    {
      const data = await AsyncStorage.getItem(asyncStorageModalId_order);
      if(data !== null)
      {
        console.log("Orders of type retrieved: Item stored in asyncStore ");// + JSON.stringify(data));
        const orders = JSON.parse(data);
        return {loaded:orders, state:null};
      }
      else
      {
        //Failed to retrieve orders data..
        //Check API
        const response = await Ajax.fetchRequest({
          method: 'POST',
          body: {
            user_id: user.id,
            get_user_data: user.role,
          },
          endpoint: '',
        });

        if(Ajax.checkResponse(response))
        {
          let orders = response.return_data.cart_items;

          const store = await AsyncStorage.setItem(asyncStorageModalId_order, JSON.stringify(orders));

          console.log("Orders retrieved: Item fetched from api ");// + JSON.stringify(orders));
          return {loaded:orders, state:null};
        }
        else {
          //Failed to get response
          //..
          return {loaded:_orders, state:null};
        }

      }

    } catch (error) {
      console.log("Failed to fetch Order: " + error);
    }
  },



  setOrders(orders)
  {
    console.log("Saving Orders");
    try 
    {
      AsyncStorage.setItem(asyncStorageModalId_order, JSON.stringify(orders));
      return orders;
    }
    catch (error) 
    {
      console.log("Error saving orders: " + error);
      return null;
    }
  },



















};
