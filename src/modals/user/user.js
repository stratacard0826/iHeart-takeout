import { AsyncStorage } from 'react-native';
import Ajax from '../../../src/util/ajax.js';

const asyncStorageModalId_user = '@TakeoutModal:user';

export default {

  //Roles


  //
  async getUser(logout, _user) {

    console.log("Fetch User Start...");
    let user = _user;
    if(user == null) {

      //Check store
      try
      {
        const data = await AsyncStorage.getItem(asyncStorageModalId_user);
        if(data !== null)
        {
          console.log("User retrieved: Item stored in asyncStore " + JSON.stringify(user));
          user = JSON.parse(data);
          return user;
        }
        else
        {
          //Failed to retrieve user data..
          //Logout user.. user required
          //..
          console.log("No User Found");

          return null;
        }

      } catch (error) {
        console.log("Failed to fetch User: " + error);
      }
    }
    else {
      console.log("User retrieved: Item stored in state " + JSON.stringify(user));
      return user;
    }
  },

  setUser(user) {
    console.log("Saving User");
    try 
    {
      AsyncStorage.setItem(asyncStorageModalId_user, JSON.stringify(user));
      return user;
    }
    catch (error) 
    {
      console.log("Error saving user: " + error);
      return null;
    }
  },


  getEmptyUserObject()
  {
    return {
      id: 0,
      rating: 0,
      role: '',
      name: '',
      email: '',
      phoneNumber: '',
      profile: require('../../../assets/images/profile-placeholder-icon/profile-placeholder-icon.png'),
      token: '',
      location: {
        home: {
          name: 'Home Address',
          lat: 0,
          lon: 0,
        },
        work: {
          name: 'Work Address',
          lat: 0,
          lon: 0,
        },
      },
      bank: {
        name: '',
        institution: '',
        branch: '',
        account: '',
      },
      certificate: {
        dateIssed: '',
        espIssed: '',
        certImgSrc: '',
        location: {
          name: 'Place Certificate Signed',
          lat: 0,
          lon: 0,
        },
      },
      wallet: {
        depositCycle: '',
        amount: 0,
        cps: 0,
        rtd: 0,
      },
    };
  }







  /*user = {
    id: 1,
    rating: 5,
    role: 'customer',
    name: 'Myles',
    email: 'pineconegrant@gmail.com',
    phoneNumber: '6479933920',
    profile: require('../../../assets/images/profile-placeholder-icon/profile-placeholder-icon.png'),
    location: {
      home: {
        name: 'Home Address',
        lat: 123.132323,
        lon: 23.232343,
      },
      work: {
        name: 'Work Address',
        lat: 123.132323,
        lon: 23.232343,
      },
    },
    bank: {
      name: 'TD Canada Trust',
      institution: 'TD Inst.',
      branch: 'TD Branch',
      account: '12345467890',
    },
    certificate: {
      dateIssed: '01/10/1993',
      espIssed: '01/11/1993',
      certImgSrc: require('../../../assets/images/profile-placeholder-icon/profile-placeholder-icon.png'),
      location: {
        name: 'Toronto',
        lat: 232.24353,
        lon: 43.434332,
      },
    },
    wallet: {
      depositCycle: 'Weekly',
      amount: 0.00,
      cps: 0.00,
      rtd: 0.00,
    },
  };*/




};
