import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity, Button } from 'react-native';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {Modal, Portal,Colors} from 'react-native-paper';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import { ScrollView } from 'react-native-gesture-handler';
import * as SQLiteExpo from 'expo-sqlite';
var db;
GoodsItem.propTypes={
  data:PropTypes.object,
  addFavor:PropTypes.func,
  deleteFavor:PropTypes.func,
  isFindFavor:PropTypes.func,
};
function GoodsItem (props){

  const favorFun=()=>{
    if(isFavor==true){
      setIsFavor(false);
      props.deleteFavor(props.data);
    }
    else{
      setIsFavor(true);
      props.addFavor(props.data);
    }
  }; 
  const [visible, setVisible] = React.useState(false);
  const [num,setNum]=React.useState(props.data.num);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [isFavor,setIsFavor]=React.useState(props.isFindFavor(props.data.key));
  const plus=()=>{
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
        tx.executeSql('update Book set num=? where id=?'
      , [num+1,props.data.key], ()=> {
          setNum(num+1);
          console.log('plus');
      }, (err)=> {
        console.log('plus'+err);
      });
    });
  }
  const minus=()=>{
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
      tx.executeSql('update Book set num=? where id=?'
      , [num-1,props.data.key], ()=> {
          setNum(num-1);
          console.log('minus');
      }, (err)=> {
        console.log('minus'+err);
      });
    });
  }
  return(
    <TouchableOpacity onPress={showModal}>
    <View style={styles.container}>
      <Image
        source={props.data.image }
        style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{props.data.title}</Text>
        <TouchableOpacity onPress={()=>favorFun()} style={{alignSelf:"flex-end",marginRight:10,height:px2dp(25),width:px2dp(25)}} >
          {isFavor?(<AntdIcon name={'star'} size={px2dp(20)} color={'#0865b5'}/>)
            :(<AntdIcon name={'staro'} size={px2dp(20)} color={'#0865b5'}/>)}
        </TouchableOpacity>
        <Text style={styles.author}>作者:{props.data.author}    售价:￥{props.data.price}</Text>
      </View>
    </View>
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        <ScrollView>
        <TouchableOpacity 
        onPress={()=>favorFun()}>
          {isFavor?(<AntdIcon name={'star'} size={px2dp(24)} color={'#0865b5'} style={{alignSelf:"flex-end"}}/>)
            :(<AntdIcon name={'staro'} size={px2dp(24)} color={'#0865b5'} style={{alignSelf:"flex-end"}}/>)}
          </TouchableOpacity>
          <Text style={{fontSize:18,alignSelf:"center"}}>{props.data.title}({props.data.author}著)</Text>
        <Image
            source={props.data.image }
            style={styles.detailsImage}
        />
        <Text style={styles.priceStyle}>￥{props.data.price}</Text>
        <Text>{props.data.description}</Text>
        <View style={{flexDirection:"row",alignItems:"center",alignSelf:"flex-end",marginTop:px2dp(5)}}>
          <TouchableOpacity style={{marginHorizontal:px2dp(12)}}
            onPress={()=>{plus()}}>
          <AntdIcon name="pluscircle" size={px2dp(22)}></AntdIcon>
          </TouchableOpacity >
          <Text style={{fontSize:20}}>{num}</Text>
          <TouchableOpacity style={{marginHorizontal:px2dp(12)}}
          onPress={()=>{minus()}}>
            <AntdIcon name="minuscircle" size={px2dp(22)}></AntdIcon>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </Modal>
    </Portal>
  </TouchableOpacity>    
  );
};
export default GoodsItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:Colors.white,
      borderRadius:20,
      marginBottom:20,
    },
    rightContainer: {
      flex: 1
    },
    title: {
      fontSize: 20,
      marginVertical:4,
      textAlign: 'center'
    },
    author: {
      textAlign: 'center'
    },
    thumbnail: {
      marginLeft:20,
      width: 53,
      height: 81
    },
    list: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF'
    },
    containerStyle:{
      backgroundColor: 'white', 
      padding: 10,
      marginHorizontal:20,
      borderRadius: px2dp(20),
      height:430,
    },
    detailsImage:{
      marginVertical:10,
      alignSelf:"center"
    },
    priceStyle:{
      color:Colors.orange400,
      fontWeight:"bold",
      alignSelf:"flex-end"
    }
  });