//This is an example of React Native Tab
import React from 'react';
//import react in our code.
//For React Navigation Version 2+
//import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
//For React Navigation Version 3+
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import Navigator in our project
 
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
//Making TabNavigator which will be called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
const TabScreen = createMaterialTopTabNavigator(
  {
    To_Do: { screen: FirstPage },
    Calendar: { screen: SecondPage },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#454545',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);
 
//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#454545',
      },
      headerTintColor: '#FFFFFF',
      title: 'To do To do',
    },
  },
});
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);