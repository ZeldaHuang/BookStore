import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { Provider,Modal, Portal,Colors,Card,Button} from 'react-native-paper';
import CartItem from "../component/cartItem"
import Data from '../data';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import * as SQLiteExpo from 'expo-sqlite';
import { useEffect,useImperativeHandle } from 'react';
var db;
function ShopCart ({ route, navigation }){
    const [allChecked,setAllChecked] =React.useState(false);
    const [bookData,setBookData]=React.useState([]);
    const [totPrice,setTotPrice]=React.useState(0);
    const initBookData=()=>{
        console.log("in");
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
          tx.executeSql('select * from Book where num>0',
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
                    }
                    item.num=u.num;
                    data.push(item);
                }
                setBookData(data);
            });
        });
    }
    const changeTotPrice=(changePrice)=>{
        if(allChecked&&changePrice>0){  

            return ;
        }
        if(totPrice+changePrice>=0){
            setTotPrice(totPrice+changePrice);
        }
    }
    useEffect(()=>{
        initBookData();
    },[route.params])
    return (
        <Portal.Host>
            <View style={styles.container}>
            <FlatList
                data={bookData}
                renderItem={({item}) => 
                <CartItem data={item}
                    changeTotPrice={(price)=>changeTotPrice(price)}
                    checked={allChecked} reFlash={()=>initBookData()}/>
                }
            />
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={()=>{
                    if(allChecked){
                        setAllChecked(!allChecked);
                        setTotPrice(0);
                        return;
                    }
                    setAllChecked(!allChecked);
                    var tot=0;
                    for(let i=0;i<bookData.length;++i){
                        tot+=bookData[i].price*bookData[i].num;
                    }
                    setTotPrice(tot);
                }}
                style={{alignItems:"center",flexDirection: 'row',marginLeft:px2dp(10),width:px2dp(50)}} >
                    <AntdIcon name={allChecked==true?"checkcircle":"checkcircleo"} size={20} style={{marginHorizontal:px2dp(10)}}></AntdIcon>
                    <Text style={{fontSize:15}}>全选</Text>
                </TouchableOpacity>
                <Text style={{textAlign:"center",fontSize:15,alignSelf:"center",marginLeft:px2dp(100)}}>
                        总计:
                        <Text style={{color:Colors.orange700}}>￥{totPrice}</Text>
                </Text>
                <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.bottomButton}>
                    结算
                </Button>
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
    bottomBar:{
        width:deviceWidth,
        flexDirection:"row",
        height:px2dp(50),
        backgroundColor:Colors.white
    },
    bottomButton:{
        width:px2dp(100),
        height:px2dp(40),
        marginBottom:px2dp(5),
        alignSelf:"flex-end",
        position:"absolute",
        marginLeft:deviceWidth-px2dp(110),
        borderRadius:px2dp(20),
        backgroundColor:Colors.orange700
    }
  });