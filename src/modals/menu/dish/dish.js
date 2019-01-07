import { AsyncStorage } from 'react-native';
import Ajax from '../../../../src/util/ajax.js';

const asyncStorageModalId_dish = '@TakeoutModal:dish';

export default {

  //
  async getDishes(user, _dishes) {

    if(_dishes != null && _dishes.length > 0) {
      console.log("Dishes retrieved: Item stored in state ");
      return {loaded:null, state:_dishes}
    }

    //Check store
    try
    {
      const data = await AsyncStorage.getItem(asyncStorageModalId_dish);
      if(data !== null)
      {
        console.log("Dishes retrieved: Item stored in asyncStore ");// + JSON.stringify(data));
        const dishes = JSON.parse(data);
        return {loaded:dishes, state:null}
      }
      else
      {
        //Failed to retrieve dishes data..
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
          let dishes = response.return_data.menu_items;

          //Save both unfiltered response and filtered response.. unfiltered response is used for quick queries compare
          //response with unfiltered response to see if any changes were made.. if changes found filter and save new
          //filtered response.. updated state

          //Before saving dishes reorder list from nearest to furthest
          //..

          AsyncStorage.setItem(asyncStorageModalId_dish, JSON.stringify(dishes));

          console.log("Dishes retrieved: Item fetched from api ");// + JSON.stringify(dishes));
          return {loaded:dishes, state:null};
        }
        else {
          //Failed to get response
          //..
          return {loaded:_dishes, state:null};
        }

      }

    } catch (error) {
      console.log("Failed to fetch dishes: " + error);
    }
  },

  setDish(dish)
  {
    console.log("Saving Dish");
    try 
    {
      AsyncStorage.setItem(asyncStorageModalId_dish, JSON.stringify(dish));
      return dish;
    }
    catch (error) 
    {
      console.log("Error saving dish: " + error);
      return null;
    }
  },

  getDishPrice(price)
  {
    //Price is in dollars
    return "$" + parseFloat(price).toFixed(2);
  },


  getDishPoints(price)
  {
    //Price is in dollars
    const _price = parseFloat(price).toFixed(2);
    return (_price * 20.00) + " points";
  },






};
