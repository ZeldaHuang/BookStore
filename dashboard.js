import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge } from 'react-native-paper';
import HomeScreen from './app/pages/homepage'
import ShopCart from './app/pages/shopCart'
import BookList from './app/pages/bookpage';
import MgzList from './app/pages/mgzPage';
import PaperList from './app/pages/paperPage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import * as SQLiteExpo from 'expo-sqlite';
import { useEffect } from 'react';
var db;
export default function App({route,navigation}) {
  const getNum=()=>{
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
      tx.executeSql('select * from Book where num>0',[],
        (tx,results)=>{
          var len=results.rows.length;
          var tot=0;
          for(let i=0;i<len;++i){
            var u=results.rows.item(i);
            tot+=u.num;
          }
          setCartNum(tot);
        },
        ()=>{
          
        }
      )
    });
  }
  const [cartNum,setCartNum]=React.useState(0);
  const changeNum=(val)=>{
    setCartNum(cartNum+val);          
  }
  React.useState(getNum());
  useEffect(()=>{
    getNum();
  },[route]);
  return (
      <Stack.Navigator >
        <Stack.Screen name="BookStore">
        {() => (
                <Tab.Navigator
                  
                  lazy={true}
                  screenOptions={({ route }) => ({
                    
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === 'HomePage') {
                        iconName = 'home';
                      } else if (route.name === 'ShoppingCart') {
                        iconName = 'shoppingcart';
                      } else if (route.name === 'My') {
                        iconName = 'inbox';
                      }
                      var visible=(iconName=="shoppingcart"?true:false);
                      return (
                        <View>
                          <Icon name={iconName} size={size} color={color} />
                          <Badge visible={visible} style={{position:"absolute",left: 15,  bottom: 15}} size={15}>{cartNum}</Badge>
                        </View>
                      );
                    },
                    
                  })}
                  tabBarOptions={{
                    activeTintColor: '#0865b5',
                    inactiveTintColor: '#666',
                  }}
                  >
                  <Tab.Screen name="HomePage" options={{ title: '主页'  }} component={HomeScreen}/>
                  <Tab.Screen name="ShoppingCart" options={{ title: '购物车' }} component={ShopCart}
                   listeners={({ navigation, route }) => ({
                    tabPress: e => {
                      // Prevent default action
                      e.preventDefault();
                
                      // Do something with the `navigation` object
                      navigation.navigate('ShoppingCart',{gg:"..."});
                    },
                  })}/>
                  <Tab.Screen name="My" options={{ title: '我的' }} component={HomeScreen} />          
                </Tab.Navigator>
              )}
        </Stack.Screen>
        <Stack.Screen name="BookList" component={BookList} options={{title:'书籍列表'}}/>
        <Stack.Screen name="MgzList" component={MgzList} options={{title:'杂志列表'}}/>
        <Stack.Screen name="PaperList" component={PaperList} options={{title:'报纸列表'}}/>
      </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
