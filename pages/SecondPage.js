/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, FlatList, StyleSheet, Text, View, Alert,
  Image, Button, TouchableOpacity, Modal, TextInput
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Modalpop from "react-native-modal";
import CheckBox from 'react-native-check-box'
import DatePicker from 'react-native-datepicker';


import { db } from '../config'; // base de datos
import { fire } from '../config';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Bienvenido a TODO TODO',
});
var markedDays = {};
var ListaMarcada = new Array();
var KeysMarcada = new Array();

const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const anio = new Date().getFullYear();
const fechaActual = dia + '/' + mes + '/' + anio;

let addItem = item => {
  db.ref('/tareas').push({
    date: item.date,
    deadline: item.deadline,
    description: item.text,
    status: item.status,
    currentUser: item.currentUser.email
  });
};
let editItem = item => {
  item.key

  db.ref('/tareas/' + item.key + "/").update({
    date: item.date,
    deadline: item.deadline,
    description: item.text,
    status: item.status
  });
};

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
    tasks: [],
    text: "",
    date: fechaActual,
    deadline: fechaActual,
    status: false,
    modalVisible: false,
    currentUser: null,
    ModalTitle: "Add To Do",
    key: null,
    dayMarked: ''
  };
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  //Agregar una tarea rápida
  SaveTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      if (this.state.ModalTitle == "Add To Do") {
        addItem(this.state); //agregmos una tarea a firebase 
      } else {
        editItem(this.state);
      }

      this.setState({ text: "", modalVisible: false });
    }
  };

  addTaksModal = () => {

    this.setState({ ModalTitle: "Add To Do", modalVisible: true, date: this.state.FechaMarcada, deadline: this.state.FechaMarcada });


  }
  cancel = () => {

    this.setState({ text: "", date: fechaActual, deadline: fechaActual, modalVisible: false });

  }


  //Elimina el card seleccionado
  deleteTask(key, index) {
    db.ref('/tareas').child(key).remove();
  };

  //Metodo para editar el contenido de card, la idea es hacerlo en un card
  editTask = (i, item) => {

    this.setState({ key: i, ModalTitle: "Edit To Do", text: item.description, date: item.date, deadline: item.deadline, modalVisible: true });



  }

  changeStatus(i, estado) {
    status = !estado;
    db.ref('/tareas/' + i + "/").update({
      status: status
    });
  }

  // modal pop up

  Cerrar = () => {
    this.setState({ isModalVisible: false, dayMarked: '' });
  };

  onDayPress(day) {
    ListaMarcada = new Array();

    this.DaysMarked(this.state.tasks, day.dateString,this.state.keys);
    var diaSinFormato;
    var dia;
    diaSinFormato = day.dateString.split('-');
    dia = diaSinFormato[2] + "/" + diaSinFormato[1] + "/" + diaSinFormato[0];
    this.setState({ Marcadostasks: ListaMarcada, FechaMarcada: dia, isModalVisible: true, dayMarked: day.dateString });
  }

  DaysMarked = (tasks, day,keys) => {
    ListaMarcada = new Array();
    KeysMarcada = new Array();
    var diaSinFormato;
    var dia;
    var i=0;
    tasks.forEach(element => {

      diaSinFormato = element.date.split('/');
      if (diaSinFormato[0].length == 1) {
        diaSinFormato[0] = '0' + diaSinFormato[0];
      }
      if (diaSinFormato[1].length == 1) {
        diaSinFormato[1] = '0' + diaSinFormato[1];
      }
      dia = diaSinFormato[2] + "-" + diaSinFormato[1] + "-" + diaSinFormato[0];
      if (day == dia) {
        KeysMarcada.push(keys[i]);
        ListaMarcada.push(element);
      }
     i++;
    });
  }
  componentDidMount() {
    const { currentUser } = fire.auth()
    db.ref('/tareas').on('value', snapshot => {
      markedDays = {};
      let data = snapshot.val();
      let keys = Object.keys(data);
      let listTasks = Object.values(data);
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
        console.log(element);
      });

      const markedDates2 = Object.assign({}, markedDays)
      if (this.state.dayMarked != '') {
        this.DaysMarked(listTasks, this.state.dayMarked,keys);
      }
      this.setState({
        markedDates: markedDates2, tasks: listTasks, keys: keys, currentUser: currentUser, Marcadostasks: ListaMarcada
      });
    });
  }
  render() {
    console.disableYellowBox = true;
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
        <Modalpop
          isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: '#d3d3d3', flex: 0.8 }}>
            <View style={{ flex: 0.8, padding: 1 }}>
              <Text style={styles.welcome}>
                Fecha: {this.state.FechaMarcada}
              </Text>
              <FlatList style={styles.list}
                data={this.state.Marcadostasks}
                renderItem={({ item, index }) =>
                  <View style={styles.eventBox}>
                    <View style={styles.eventContent}>
                      <View style={styles.card_header}>
                        <CheckBox style={styles.card_done} checkedCheckBoxColor="#87B56A" onClick={() => {
                          this.changeStatus(KeysMarcada[index], item.status)
                        }} isChecked={item.status} />
                        <Text style={styles.card_title}></Text>
                        <TouchableOpacity style={styles.card_delete} onPress={() => this.deleteTask(KeysMarcada[index], index)}  >
                          <Image source={require('./../images/delete.png')} style={styles.delete_button} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={styles.card_event} onPress={() => this.editTask(KeysMarcada[index], item)}>
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
                <Button color="#87B56A" title="Agregar" onPress={this.addTaksModal} />
              </View>
              <View style={{ margin: "1%" }}>
                <Button color="#ff4040" title="Cerrar" onPress={this.Cerrar} />
              </View>
            </View>
          </View>
        </Modalpop>
        <Modal
          animationType="slide"

          visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
          <View style={{ backgroundColor: '#f2f2f2', flex: 0.6 }}>
            <View style={{ backgroundColor: '#f2f2f2', flex: 0.9, padding: 1 }}>
              <Text style={styles.welcome}>{this.state.ModalTitle} </Text>
              <Text>Date:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate={fechaActual}//Ejemplo "01-01-2019"                
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />

              <Text>Deadline:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.deadline} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate={this.state.date}//Ejemplo "01-01-2019" 
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(deadline) => { this.setState({ deadline: deadline }) }}
              //Podemos cambiar esto para que 
              //se guarde al darle al btn gurardar
              />

              <Text>Description:</Text>
              <TextInput
                style={{ backgroundColor: '#d3d3d3' }}
                multiline={true}
                numberOfLines={4}
                onChangeText={this.changeTextHandler}
                value={this.state.text}
                placeholder="Add Task"
                returnKeyType="done"
                returnKeyLabel="done"
              />
              <View style={{ margin: "1%" }}>
                <Button
                  onPress={this.SaveTask}
                  title="Save"
                  color="#87B56A"
                  accessibilityLabel="Save"
                />
              </View>
              <View style={{ margin: "1%" }}>
                <Button
                  onPress={this.cancel}
                  title="Cancel"
                  color="#ff4040"
                  accessibilityLabel="Cancel"
                />
              </View>

            </View>

          </View>
        </Modal>
      </View >
    );
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