import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Provider,Modal, Portal } from 'react-native-paper';
import BookItem from '../component/item';
import Data from '../data';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import * as SQLiteExpo from 'expo-sqlite';
var db;
function BookList ({ route, navigation }){
    const [addFavor,deleteFavor,isFindFavor]=[route.params.addFavor,route.params.deleteFavor,route.params.isFindFavor];
    // const [books,setBooks]=React.useState(getBooks());
    // const init=()=>{
    //     db = SQLiteExpo.openDatabase('MyDb', "1.0");
    //     db.transaction((tx)=>{
    //         tx.executeSql('CREATE TABLE IF NOT EXISTS Book(' +
    //         'id varchar PRIMARY KEY,' +
    //         'num INTEGER)'
    //       , [], ()=> {
    //           console.log('createTable');
    //       }, (err)=> {
    //         console.log('createTableErr'+err);
    //       });
    //       for(let i=0;i<Data.book.length;++i){
    //         tx.executeSql("INSERT INTO Book(id,num)"+
    //             "values(?,?)"
    //         , [Data.book[i].key,0], ()=> {
    //         }, (err)=> {
    //             console.log('insertError'+err);
    //         });
    //       }
    //     });
    // }
    // const getBooks=()=>{
    //     init();
    // }
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