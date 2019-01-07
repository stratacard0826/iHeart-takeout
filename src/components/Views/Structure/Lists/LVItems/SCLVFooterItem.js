import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const assetDir = '../../../../../../assets';

class LVFooterItem extends React.Component {

  //
  constructor(props) {
    super(props);

  }

  render() {

    const { options, separator } = this.props;

    let separatorBorder = {  };
    if(separator) {
      separatorBorder = { borderTopWidth: 0.5, borderTopColor:'#F1F1F2' };
    }

    return (
      <View style={[styles.container, options.container, separatorBorder]}>
        <Text style={styles.copyright}>{this.props.copyright}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  copyright: {
    color: '#D1D2D4',
  },

});

module.exports = LVFooterItem;
