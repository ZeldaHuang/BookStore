import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Provider,Modal, Portal } from 'react-native-paper';
import CartItem from "../component/cartItem"
import Data from '../data';
import {deviceWidth, isIOS, px2dp} from '../util/index';
function ShopCart ({ route, navigation }){
    return (
        <Portal.Host>
            <View style={styles.container}>
                <CartItem></CartItem>
                <CartItem></CartItem>
            </View>
        </Portal.Host>
    
    );
}

export default ShopCart;
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });