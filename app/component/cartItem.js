import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {Modal, Portal,Colors,RadioButton,IconButton,Card} from 'react-native-paper';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import { ScrollView } from 'react-native-gesture-handler';
import LocalImg from '../images/images'

function CartItem (props){
const [checked, setChecked] = React.useState(false);
const [visible, setVisible] = React.useState(false);
const [num,setNum]=React.useState(0);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
    return(
      <Card style={{height:100,borderRadius:20,marginTop:10}}>
<TouchableOpacity onPress={()=>{setChecked(!checked)}} style={{marginTop:30}}>
          <View style={styles.container}>
            <AntdIcon name={checked==true?"checkcircle":"checkcircleo"} size={20} style={{marginLeft:20}}></AntdIcon>
            <Image
            source={LocalImg.book1 }
            style={styles.thumbnail }
           /> 
            <View style={styles.rightContainer}>
              
              <View style={{alignSelf:"center"}}>
                <Text style={styles.title}>《三体三部曲》</Text>
                <Text style={styles.price}>￥99</Text>
              </View>
              <IconButton icon="plus-circle" style={{alignSelf:"center"}} onPress={()=>{setNum(num+1)}}/>
              <Text style={{alignSelf:"center",fontSize:20}}>{num}</Text>
              <IconButton icon="minus-circle" style={{alignSelf:"center" }} onPress={()=>{setNum(num-1)}} />
              
            </View>
          </View>
        </TouchableOpacity>
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
        marginRight:100,
        flexDirection:"row",
      },
      title: {
        fontSize: 20,
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