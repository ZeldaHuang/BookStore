import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity } from 'react-native';
import LocalImg from '../images/images';
import { Banner,Avatar, Button, Card, Title, Portal,Modal,IconButton, Colors,List} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {deviceWidth, isIOS, px2dp} from '../util/index';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import BookItem from '../component/item';
import PropTypes from 'prop-types';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const InputHeight = px2dp(28);

const HEADER_HEIGHT = px2dp(100);
const HEADER_FIX_Y = px2dp(40);

const cardMargin = px2dp(10);
const borderRadius = px2dp(20);

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};
export default function HomeScreen(props) {
  const [favors,setFavors]=React.useState([]);
  const addItem=(item)=>{
    var arrays=favors;
    arrays.push(item);
    setFavors(arrays);
  };
  const deleteItem=(item)=>{
    var arrays=favors;
    arrays.forEach((elem, index, arr)=>{
      if(item.key == elem.key) {
           arr.splice(index, 1);
      }
    });
    setFavors(arrays);
  };
  const isFindItem=(key)=>{
    // console.log(props.favors);
    for( var i=0;i<favors.length;++i){
      // console.log(props.favors[i].key+"....");
      if(favors[i].key==key){
        return true;
      }
    }
    return false;
  };
    return (
      <Portal.Host>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#f3f3f3' }}>
        <ScrollView >
          <View style={style.centerView}>
            <MyComponent navigation={props.navigation} 
            addFavor={(item)=>addItem(item)} deleteFavor={(item)=>deleteItem(item)} isFindFavor={(item)=>isFindItem(item)} />
          </View>
          <View style={style.centerView}>
            <MyFavor navigation={props.navigation} items={favors} 
            addFavor={(item)=>addItem(item)} deleteFavor={(item)=>deleteItem(item)} isFindFavor={(item)=>isFindItem(item)} />
          </View>
          <View style={style.centerView}>
            <RenderBanner {...props}/>
          </View>         
        </ScrollView>
      </View>
      </Portal.Host>
    );
  };
FavorItem.propTypes={
  data:PropTypes.object,
  addFavor:PropTypes.func,
  deleteFavor:PropTypes.func,
  isFindFavor:PropTypes.func,
}
function FavorItem(props){
  return(
          <BookItem data={props.data}
    addFavor={props.addFavor} deleteFavor={props.deleteFavor} isFindFavor={props.isFindFavor} />
  )
};
  RenderBanner.propTypes = {
    navigation: PropTypes.object,
  };
  function RenderBanner(props){
    const [visible, setVisible] = React.useState(true);
    return (
      <Card>
        <Banner
        visible={visible}
        actions={[
          {
            label: '隐藏',
            onPress: () => setVisible(false),
          },
          {
            label: '了解更多',
            onPress: () => {},
          },
        ]}
        icon= "star"
        >
        <Text style={{fontSize:16}}>好书推荐</Text>
      </Banner>
      </Card>
    );
  };
  MyComponent.propTypes = {
    navigation: PropTypes.object,
    addFavor:PropTypes.func,
    deleteFavor:PropTypes.func,
    isFindFavor:PropTypes.func,
  };
  function MyComponent(props) {
    const [addFavor,deleteFavor,isFindFavor]=[props.addFavor,props.deleteFavor,props.isFindFavor];
    return (
    <Card>
      <TouchableOpacity>
      <Card.Content style={{alignItems:"center"}}>
        <Title>
        </Title>
      </Card.Content>
      <Card.Cover source={LocalImg.banner0} style={style.bannerImg}>
      </Card.Cover>
      </TouchableOpacity>
      <Card.Actions>
      <Button  style={style.typeButton}  icon="book-open-page-variant" color={Colors.black}
      onPress={()=>props.navigation.navigate('BookList',{addFavor:addFavor,deleteFavor:deleteFavor,isFindFavor:isFindFavor})}>
        <Text style={style.typeText}>书籍</Text>
      </Button>
      <Button  style={style.typeButton} icon="book" color={Colors.black}
      onPress={()=>{}}>
        <Text style={style.typeText}>杂志</Text>
      </Button>
      <Button  style={style.typeButton} icon="book-open-variant" color={Colors.black}
      onPress={()=>{}}
      >
       <Text style={style.typeText}>报纸</Text>
      </Button>
      </Card.Actions>
    </Card>
    )
  };
    
  MyFavor.propTypes = {
    navigation: PropTypes.object,
    items:PropTypes.object,
  };
  function MyFavor (props) {
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <Card>
        <List.Accordion
        title="我的收藏"
        left={props => <List.Icon {...props} icon="heart" />}
        expanded={expanded}
        onPress={handlePress}>
        {props.items.map((item,index)=>{
          return (<FavorItem data={item} {...props}/>);
        })}
      </List.Accordion>
      </Card>
      
    );
  };
const style=StyleSheet.create({
  centerView:{
    marginTop:5,
  },
  bannerImg: {
    height: px2dp(120),
    width: deviceWidth - cardMargin * 2 - 10,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  typeButton:{
    height:px2dp(30),
    marginHorizontal: 15,
    marginBottom:5
  },
  typeText:{
    fontSize:18,
  },
  containerStyle:{
    backgroundColor: 'white', 
    padding: 10,
    marginHorizontal:20,
    borderRadius: px2dp(20),
    height:430,
  },
});
