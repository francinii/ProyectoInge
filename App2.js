import React, { Component } from 'react';
import {
  TouchableOpacity, Image, Button
} from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SecondPage from './pages/SecondPage';
import Guardando from './pages/FirstPage';
import Loading from './pages/Loading';
import MenuSesion from './components/menuSesion';
//import App from './App';

const TabScreen = createMaterialTopTabNavigator(

  {
    To_Do: { screen: Guardando },
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



const AppNavigator = createStackNavigator({
  Loading: { screen: Loading },
  Acceder: { screen: Login },
  Registro: { screen: SignUp },
  Home: {
    screen: TabScreen,
    navigationOptions: {
      headerRight: (
        <MenuSesion></MenuSesion>
      ),
      headerStyle: {
        backgroundColor: '#454545',
      },
      headerTintColor: '#FFFFFF',
      title: '',
    },
  },

});


const App = createAppContainer(AppNavigator);

export default App;