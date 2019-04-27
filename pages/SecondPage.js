/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert} from 'react-native';
import {CalendarList} from 'react-native-calendars'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Bienvenido a TODO TODO',
});
var markedDays={};
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {   markedDates:{}  };
    this.onDayPress = this.onDayPress.bind(this);
    this.pressOK;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> TO DO TO DO!</Text>       
        <Text style={styles.welcome}>Calendario</Text>  
        <CalendarList
         // Callback which gets executed when visible months change in scroll view. Default = undefined
        
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        // Set custom calendarWidth.  
        onDayPress={(day) => {this.onDayPress(day)}} 
        markedDates={
          this.state.markedDates      
        }
            />
      </View>
    );
  }
  onDayPress(day) {        
    
 
    Alert.alert(
      'Alert Title',
      day.dateString,
      [
        {text: 'OK', onPress: () => this.pressOK(day)},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },        
      ],
      {cancelable: false},
    );
  }
  pressOK(day){
    markedDays[day.dateString]={marked:true};
    console.log(markedDays);
    const markedDates2 = Object.assign({}, markedDays) 
    this.setState({
        markedDates: markedDates2,    
    });   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
