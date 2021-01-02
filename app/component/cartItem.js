import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {Modal, Portal,Colors,RadioButton,IconButton,Card} from 'react-native-paper';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import { ScrollView } from 'react-native-gesture-handler';
import LocalImg from '../images/images'
import { useEffect } from 'react';
import * as SQLiteExpo from 'expo-sqlite';
var db;
CartItem.propTypes={
  data:PropTypes.object,
  changeTotPrice:PropTypes.func,
  reFlash:PropTypes.func,
  checked:PropTypes.bool,
}
function CartItem (props){
  const [checked, setChecked] = React.useState(props.checked);
  const [visible, setVisible] = React.useState(false);
  const [num,setNum]=React.useState(props.data.num);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(()=>{
    setChecked(props.checked);
  },[props.checked]);
  useEffect(()=>{
    props.changeTotPrice(checked?(props.data.price*num):(-props.data.price*num));
  },[checked])
  const plus=()=>{
    if(checked){
      props.changeTotPrice(props.data.price);
    }
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
        tx.executeSql('update Book set num=? where id=?'
      , [num+1,props.data.key], ()=> {
          setNum(num+1);
          console.log('plus');
          props.reFlash();
      }, (err)=> {
        console.log('plus'+err);
      });
    });
  }
  const minus=()=>{
    if(checked){
      props.changeTotPrice(-props.data.price);
    }
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
      tx.executeSql('update Book set num=? where id=?'
      , [num-1,props.data.key], ()=> {
          setNum(num-1);
          props.reFlash();
          console.log('minus');
      }, (err)=> {
        console.log('minus'+err);
      });
    });

  }
  return(
    <Card style={{height:100,borderRadius:20,marginTop:10}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{setChecked(!checked)}} style={{alignItems:"center",flexDirection: 'row',marginBottom:px2dp(15)}} >
          <AntdIcon name={checked==true?"checkcircle":"checkcircleo"} size={20} style={{marginLeft:20}}></AntdIcon>
          <Image
          source={props.data.image}
          style={styles.thumbnail }
        /> 
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={{alignSelf:"center",marginLeft:px2dp(5)}}
          onPress={()=>{showModal()}}>
            <Text style={styles.title}>{props.data.title}</Text>
            <Text style={styles.price}>￥{props.data.price}</Text>
          </TouchableOpacity>
        </View> 
        <View style={{flexDirection:"row",alignItems:"center",alignSelf:"flex-end",marginBottom:px2dp(35)}}>
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
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <ScrollView>
          <TouchableOpacity 
          onPress={()=>{}}>{false?(<AntdIcon name={'star'} size={px2dp(24)} color={'#0865b5'} style={{alignSelf:"flex-end"}}/>)
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
              onPress={()=>{plus();}}>
            <AntdIcon name="pluscircle" size={px2dp(22)}></AntdIcon>
            </TouchableOpacity >
            <Text style={{fontSize:20}}>{num}</Text>
            <TouchableOpacity style={{marginHorizontal:px2dp(12)}}
            onPress={()=>{minus();}}>
              <AntdIcon name="minuscircle" size={px2dp(22)}></AntdIcon>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </Modal>
      </Portal>
    </Card>
  );
};
export default CartItem;
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:20,
        marginTop:20,
      },
      rightContainer: {
        flex: 1,
        marginHorizontal:px2dp(2),
        flexDirection:"row",
        marginBottom:px2dp(5)
      },
      title: {
        fontSize: 18,
        marginVertical:4,
        textAlign: 'center'
      },
      price: {
        fontWeight:"bold",
        textAlign: 'center',
        fontSize:15,
        color:Colors.orange900
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