
import debug from "../src/util/debug.js";
export default {

  /**** GLOBAL STYLE FUNC START ****/


  //LVInputItem styles
  LVInputItem(debugMode)
  {
    console.log("LVInputItem(): Global style: " + debug.layoutColor(_debugMode, '', 0));

    let _debugMode = false;
    if(debugMode) {
      _debugMode = true;
    }

    return {

      container: {
        flex: 1,
        padding: 15,
        backgroundColor: debug.layoutColor(_debugMode, '#FFFFFF', 0),
      },

      rowWrapper: {
        flex: 1,
        flexDirection: 'row',
      },

      contentColumnWrapper: {
        flex: 1,
      },


      title: {
        flex: 1,
        backgroundColor: debug.layoutColor(_debugMode, '', 1),
      },

      textInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: debug.layoutColor(_debugMode, '', 2),
      },

      textInput: {
        flex: 1,
        padding: 10,
        paddingLeft: 0,
        backgroundColor: debug.layoutColor(_debugMode, '', 3),
      },

      passwordViewIcon: {
        width: 50,
        resizeMode: 'contain',
        backgroundColor: debug.layoutColor(_debugMode, '', 4),
      },

      segueIcon: {
        width: 10,
        resizeMode: 'contain',
        backgroundColor: debug.layoutColor(_debugMode, '', 5),
      },

      segueIconPlaceHolder: {
        backgroundColor: debug.layoutColor(_debugMode, '', 6),
      },
    };
  },

  /**** GLOBAL STYLE FUNC END ****/

};
