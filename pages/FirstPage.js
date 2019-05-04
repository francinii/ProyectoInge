import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  Alert,
  Image,
  Modal,
  TextInput,
  Keyboard,
  Platform,
  CheckBox,
  TouchableOpacity,
  AlertAndroid,
} from "react-native";
import DatePicker from 'react-native-datepicker';

import { db } from '../config'; // base de datos




const isAndroid = Platform.OS == "android";
const viewPadding = 10;

//Fecha actual
const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const anio = new Date().getFullYear();
const fechaActual = dia + '/' + mes + '/' + anio;


//Agrega una tarea nueva
let addItem = item => {
  db.ref('/tareas').push({
    date: item.date,
    deadline: item.deadline,
    description: item.text,
    status: item.status
  });
};


export default class FirstPage extends Component {


  //Estado actual de la tarea
  state = {
    tasks: [],
    keys: [],
    text: "",
    date: fechaActual,
    deadline: fechaActual,
    status: false,
    modalVisible: false,
  };


  //Agregar una nota rapida
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  //Agregar una tarea rápida
  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      addItem(this.state); //agregmos una tarea a firebase   
      this.setState({ modalVisible: false });
    }
  };

  cancel = () => {
    this.setState({ text: "" });
    this.setState({ date: fechaActual });
    this.setState({ deadline: fechaActual });
    this.setModalVisible(!this.state.modalVisible);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  //Elimina el card seleccionado
  deleteTask(key, index) {
    db.ref('/tareas').child(key).remove();
  };

  //Metodo para editar el contenido de card, la idea es hacerlo en un card
  editTask = i => {
    alert("" + i);
  }

  changeStatus(i, estado) {
    status = !estado;
    db.ref('/tareas').child(i).child("status").setValue(status);
    this.setState({ status: false });
  }

  componentDidMount() {
    db.ref('/tareas').on('value', snapshot => {
      let data = snapshot.val();
      let keys = Object.keys(data);
      let tasks = Object.values(data);
      this.setState({ tasks });
      this.setState({ keys: keys });
    });
  }



  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}      >
        <FlatList style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View style={styles.eventBox}>
              <View style={styles.eventContent}>
                <View style={styles.card_header}>
                  <CheckBox style={styles.card_done} color="#87B56A" checked={item.status} onPress={() => this.changeStatus(this.state.keys[index], item.status)} />
                  <Text style={styles.card_title}></Text>
                  <TouchableOpacity style={styles.card_delete} onPress={() => this.deleteTask(this.state.keys[index], index)}  >
                    <Image source={require('./../images/delete.png')} style={styles.delete_button} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.card_event} onPress={() => this.editTask(this.state.keys[index])}>
                  <View style={styles.card_header} >
                    <Text style={styles.eventTime}>Date: {item.date}</Text>
                    <Text style={styles.card_title}></Text>
                    <Text style={styles.eventTime}>Deadline: {item.deadline}</Text>
                  </View>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Task"
          returnKeyType="done"
          returnKeyLabel="done"
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.setModalVisible(true); }} style={styles.TouchableOpacityStyle} >
          <Image source={require('./../images/add1.png')} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Date:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate={this.fechaActual}//Ejemplo "01-01-2019"                
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
                minDate={this.fechaActual}//Ejemplo "01-01-2019" 
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

                onChangeText={this.changeTextHandler}
                value={this.state.text}
                placeholder="Add Task"
                returnKeyType="done"
                returnKeyLabel="done"
              />



              <Button
                onPress={this.addTask}
                title="Save"
                color="#841584"
                accessibilityLabel="Save"
              />

              <Button
                onPress={this.cancel}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Save"
              />

            </View>
          </View>
        </Modal>



      </View>

      //INicio del MODAL



      // Fin del MODAL
    );
  }
}


//''''''''''''''''''''''''''''''''''''''''''''''''''Estilos '''''''''''''''''''''''''''''''''''''''''''''''
//Estilos de los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    padding: 1,
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
  },

});
