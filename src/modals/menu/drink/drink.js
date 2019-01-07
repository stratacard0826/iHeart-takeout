import { AsyncStorage } from 'react-native';
import Ajax from '../../../../src/util/ajax.js';

const asyncStorageModalId_drink = '@TakeoutModal:drink';


export default {

  async getDrinks(user, _drinks) {

    if(_drinks != null && _drinks.length > 0) {
      console.log("Drinks: Item stored in state ");
      return {loaded:null, state:_drinks};
    }

    //Check store
    try
    {
      const data = await AsyncStorage.getItem(asyncStorageModalId_drink);
      if(data !== null)
      {
        console.log("Drinks: Item stored in asyncStore ");// + JSON.stringify(data));
        const drinks = JSON.parse(data);
        return {loaded:drinks, state:null};
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
          const drinks = response.return_data.drinks;
          const store = await AsyncStorage.setItem(asyncStorageModalId_order, JSON.stringify(drinks));

          console.log("Drinks: Item fetched from api ");// + JSON.stringify(orders));
          return {loaded:drinks, state:null};
        }
        else {
          //Failed to get response
          //..
          return {loaded:_drinks, state:null};
        }

      }

    } catch (error) {
      console.log("Failed to fetch drinks: " + error);
    }
  },



  setDrinks(drinks)
  {
    console.log("Saving Drinks");
    try 
    {
      AsyncStorage.setItem(asyncStorageModalId_drink, JSON.stringify(drinks));
      return drinks;
    }
    catch (error) 
    {
      console.log("Error saving orders: " + error);
      return null;
    }
  },



















};
