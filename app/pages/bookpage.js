import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Provider,Modal, Portal } from 'react-native-paper';
import BookItem from '../component/item';
import Data from '../data';
import {deviceWidth, isIOS, px2dp} from '../util/index';
function BookList ({ route, navigation }){
    const [addFavor,deleteFavor,isFindFavor]=[route.params.addFavor,route.params.deleteFavor,route.params.isFindFavor];
    return (
        <Portal.Host>
        <View style={styles.container}>
            <FlatList
                data={Data.book}
                renderItem={({item}) => 
                <BookItem data={item}
                addFavor={addFavor} deleteFavor={deleteFavor} isFindFavor={isFindFavor}/>
                }
            />
        </View>
        </Portal.Host>
    
    );
}

export default BookList;
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });