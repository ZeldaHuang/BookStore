import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/pages/homepage'
import BookList from './app/pages/bookpage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="BookStore">
        {() => (
                <Tab.Navigator
                  lazy={false}
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
                      return <Icon name={iconName} size={size} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: '#0865b5',
                    inactiveTintColor: '#666',
                  }}>
                  <Tab.Screen name="HomePage" options={{ title: '主页' }} component={HomeScreen} />
                  <Tab.Screen name="ShoppingCart" options={{ title: '购物车' }} component={HomeScreen} />
                  <Tab.Screen name="My" options={{ title: '我的' }} component={HomeScreen} />          
                </Tab.Navigator>
              )}
        </Stack.Screen>
        <Stack.Screen name="BookList" component={BookList} />
      </Stack.Navigator>
    </NavigationContainer>
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
