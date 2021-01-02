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
    const [bookData,setBookData]=React.useState([]);
    const initBookData=()=>{
        var data=[];
        db = SQLiteExpo.openDatabase('MyDb', "1.0");
        db.transaction((tx)=>{
            // tx.executeSql('drop table if exists Book',[],()=>{console.log("删除")},()=>{console.log("删除失败")});
            tx.executeSql('CREATE TABLE IF NOT EXISTS Book(' +
            'id varchar PRIMARY KEY,' +
            'num INTEGER)'
          , [], ()=> {
              console.log('createTable');
          }, (err)=> {
            console.log('createTableErr'+err);
          });
        //   Object.keys(Data).forEach((item, i) => {
        //     Data[item].forEach((e, j) => {
        //         tx.executeSql("INSERT INTO Book(id,num)"+
        //         "values(?,?)"
        //         , [Data[item][j].key,1], ()=> {
        //         }, (err)=> {
        //             console.log('insertError'+err);
        //         });
        //     });
        //   });
          tx.executeSql('select * from Book',
            [],
            (tx,results)=>{
                var lens=results.rows.length;
                console.log(lens);
                for(let i=0;i<lens;++i)
                {
                    var u = results.rows.item(i);
                    var key=u.id;
                    var [j,k]=key.split("-");
                    if(j==0){
                        item=Data.book[k];
                        item.num=u.num;
                        data.push(item);
                    }
                }
                setBookData(data);
            });
        });
    }
    React.useState(()=>{initBookData()});
    return (
        <Portal.Host>
        <View style={styles.container}>
            <FlatList
                data={bookData}
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