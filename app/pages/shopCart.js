import React from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { Provider,Modal, Portal,Colors,Card,Button} from 'react-native-paper';
import CartItem from "../component/cartItem"
import Data from '../data';
import {deviceWidth, isIOS, px2dp} from '../util/index';
function ShopCart ({ route, navigation }){
    const [allChecked,setAllChecked] =React.useState(false);
    return (
        <Portal.Host>
            <View style={styles.container}>
                <CartItem></CartItem>
                <CartItem></CartItem>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={()=>{setAllChecked(!allChecked)}}
                style={{alignItems:"center",flexDirection: 'row',marginLeft:px2dp(10),width:px2dp(50)}} >
                    <AntdIcon name={allChecked==true?"checkcircle":"checkcircleo"} size={20} style={{marginHorizontal:px2dp(10)}}></AntdIcon>
                    <Text style={{fontSize:15}}>全选</Text>
                </TouchableOpacity>
                <View style={{marginLeft:deviceWidth-px2dp(280),flexDirection:"row"}}>
                    <Text style={{textAlign:"center",fontSize:15,alignSelf:"center",marginHorizontal:px2dp(20)}}>
                        总计:
                        <Text style={{color:Colors.orange700}}>￥99</Text>
                    </Text>
                    <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.bottomButton}>
                    结算
                     </Button>
                </View>
                
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
        alignSelf:"center",
        alignItems:"center",
        flexDirection:"row",
        height:px2dp(50),
        width:deviceWidth,
        backgroundColor:Colors.white
    },
    bottomButton:{
        width:px2dp(100),
        height:px2dp(40),
        alignSelf:"auto",
        alignItems:"center",
        borderRadius:px2dp(20),
        backgroundColor:Colors.orange700
    }
  });