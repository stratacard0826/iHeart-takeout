export default {

  regString(string)
  {
    return string.replace(/[^a-zA-Z-_ ]/g, "");;
  },

  emailString(string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(string);
    //return string.replace(/[^a-zA-Z-_ ]/g, "");
  },

  passwordString(string) {
    if(string.length > 6) {
      return true;
    }
    else {
      return false;
    }
  },

  phoneNumberString(string) {
    return string.replace(/[^a-zA-Z-_ ]/g, "");
  },
};
