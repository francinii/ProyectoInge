/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, Alert, Button, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Modal from "react-native-modal";
import CheckBox from 'react-native-check-box'
import { db } from '../config'; // base de datos

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Bienvenido a TODO TODO',
});
var markedDays = {};
var listTasks = [];
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    string: "hola",
    markedDates: {},
    Marcadostasks: [],
    isModalVisible: false,
    keys: [],
    FechaMarcada: "",
  };

  componentDidMount() {
    db.ref('/tareas').on('value', snapshot => {
      markedDays = {};
      let data = snapshot.val();
      let keys = Object.keys(data);
      listTasks = Object.values(data);
      this.setState({ tasks: listTasks });
      this.setState({ keys: keys });

      //  this.setState({ keys: keys });
      listTasks.forEach(element => {
        var diaSinFormato = element.date.split('/');
        if (diaSinFormato[0].length == 1) {
          diaSinFormato[0] = '0' + diaSinFormato[0];
        }
        if (diaSinFormato[1].length == 1) {
          diaSinFormato[1] = '0' + diaSinFormato[1];
        }
        var day = diaSinFormato[2] + "-" + diaSinFormato[1] + "-" + diaSinFormato[0];
        markedDays[day] = { marked: true, descripcion: element.description, fechaFin: element.deadline };

      });
      const markedDates2 = Object.assign({}, markedDays)
      this.setState({
        markedDates: markedDates2,
      });


    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Calendario</Text>
        <Text style={styles.welcome}> Tareas</Text>
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
          onDayPress={(day) => { this.onDayPress(day) }}
          markedDates={
            this.state.markedDates
          }
        />
        <Modal
          isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: '#d3d3d3', flex: 0.8 }}>
            <View style={{ flex: 0.8, padding: 1 }}>
              <Text style={styles.welcome}>
                {this.state.FechaMarcada}
              </Text>
              <FlatList style={styles.list}
                data={this.state.Marcadostasks}
                renderItem={({ item, index }) =>
                  <View style={styles.eventBox}>
                    <View style={styles.eventContent}>
                      <View style={styles.card_header}>
                        <CheckBox style={styles.card_done} checkedCheckBoxColor="#87B56A" disabled="true" isChecked={item.status} />
                        <Text style={styles.card_title}></Text>
                      </View>
                      <TouchableOpacity style={styles.card_event} >
                        <View style={styles.card_header} >
                          <Text style={styles.eventTime}>Deadline: {item.deadline}</Text>
                          <Text style={styles.card_title}></Text>
                        </View>
                        <Text style={styles.description}>Description:</Text>
                        <Text style={styles.description}>{item.description}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              />
            </View>
            <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: "1%", margin: "1%" }}>
              <View style={{ margin: "1%" }}>
                <Button color="#87B56A" title="Agregar" onPress={this.toggleModal} />
              </View>
              <View style={{ margin: "1%" }}>
                <Button color="#ff4040" title="Cerrar" onPress={this.toggleModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View >
    );
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onDayPress(day) {

    var ListaMarcada = new Array();
    var diaSinFormato;
    var dia;
    this.setState({ isModalVisible: !this.state.isModalVisible });
    listTasks.forEach(element => {
      diaSinFormato = element.date.split('/');
      if (diaSinFormato[0].length == 1) {
        diaSinFormato[0] = '0' + diaSinFormato[0];
      }
      if (diaSinFormato[1].length == 1) {
        diaSinFormato[1] = '0' + diaSinFormato[1];
      }
      dia = diaSinFormato[2] + "-" + diaSinFormato[1] + "-" + diaSinFormato[0];
      if (day.dateString == dia) {
        console.log("true");
        ListaMarcada.push(element);
      }
      diaSinFormato = day.dateString.split('-');
      dia = diaSinFormato[2] + "-" + diaSinFormato[1] + "-" + diaSinFormato[0];
    });
    this.setState({ FechaMarcada: "Fecha: " + dia });
    this.setState({ Marcadostasks: ListaMarcada });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  list: {
    width: "100%"
  },

  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },

  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  textInput: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 0,
    bottom: 0,
    width: "100%"
  },


  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 0
  },

  description: {
    fontSize: 16,
    color: "#151515",
  },

  eventTime: {
    fontSize: 14,
    color: "#646464",
  },

  userName: {
    fontSize: 16,
    color: "#151515",
  },

  eventBox: {
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 4,
    marginBottom: 0,
    flexDirection: 'row',
  },

  card_header: {
    flexDirection: "row",
    width: "100%",
    textAlign: 'right',
    height: 28,
  },

  card_event: {
    width: "100%",
  },

  card_done: {
    width: 25,
    textAlign: 'center',
    padding: 0,
  },

  card_title: {
    textAlign: 'center',
    fontSize: 18,
    flex: 1
  },

  card_delete: {
    padding: 0,
    textAlign: 'center',
  },

  delete_button: {
    height: 20,
    width: 20,
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});
