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
const [isFavor,setIsFavor]=React.useState(false);
const [num,setNum]=React.useState(0);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
    return(
      <Card style={{height:100,borderRadius:20,marginTop:10}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{setChecked(!checked)}} style={{alignItems:"center",flexDirection: 'row',marginBottom:px2dp(15)}} >
            <AntdIcon name={checked==true?"checkcircle":"checkcircleo"} size={20} style={{marginLeft:20}}></AntdIcon>
            <Image
            source={LocalImg.book1 }
            style={styles.thumbnail }
          /> 
          </TouchableOpacity>
          <View style={styles.rightContainer}>
            <TouchableOpacity style={{alignSelf:"center",marginLeft:px2dp(5)}}
            onPress={()=>{showModal()}}>
              <Text style={styles.title}>《三体三部曲》</Text>
              <Text style={styles.price}>￥99</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row",alignItems:"center",marginBottom:px2dp(15)}}>
              <TouchableOpacity style={{marginHorizontal:px2dp(12)}}
            onPress={()=>{setNum(num+1)}}>
              <AntdIcon name="pluscircle" size={px2dp(22)}></AntdIcon>
            </TouchableOpacity >
            <Text style={{fontSize:20}}>{num}</Text>
            <TouchableOpacity style={{marginHorizontal:px2dp(12)}}
            onPress={()=>{setNum(num-1)}}>
              <AntdIcon name="minuscircle" size={px2dp(22)}></AntdIcon>
            </TouchableOpacity>
            </View>
          </View> 
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <ScrollView>
            <TouchableOpacity 
            onPress={()=>{}}>{isFavor?(<AntdIcon name={'star'} size={px2dp(24)} color={'#0865b5'} style={{alignSelf:"flex-end"}}/>)
                :(<AntdIcon name={'staro'} size={px2dp(24)} color={'#0865b5'} style={{alignSelf:"flex-end"}}/>)}
              </TouchableOpacity>
              <Text style={{fontSize:18,alignSelf:"center"}}>《三体三部曲》(《三体三部曲》著)</Text>
            <Image
                source={LocalImg.book1 }
                style={styles.detailsImage}
            />
            <Text style={styles.priceStyle}>￥99</Text>
            <Text>fdsfdsfd</Text>
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
        marginRight:100,
        flexDirection:"row",
        marginBottom:px2dp(5)
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