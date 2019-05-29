import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Alert,
  Image,
  Modal,
  TextInput,
  Platform,
  TouchableOpacity,

} from "react-native";
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box'


import { db } from '../config'; // base de datos
import { fire } from '../config';

//hola esto es una prueba

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

//Fecha actual
const dia = new Date().getDate();
dia1 = dia + "";
if (dia < 10) {
  dia1 = '0' + dia;
}

const mes = new Date().getMonth() + 1;
mes1 = mes + "";
if (mes < 10) {
  mes1 = '0' + mes;
}

const anio = new Date().getFullYear();
const fechaActual = dia1 + '/' + mes1 + '/' + anio;


//Agrega una tarea nueva
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

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
  }

  //Estado actual de la tarea
  state = {

    tasks: [],
    keys: [],
    text: "",
    date: fechaActual,
    deadline: fechaActual,
    status: false,
    modalVisible: false,
    currentUser: null,
    ModalTitle: "Add To Do",
    key: null,
    filtroActual: 'All'
  };


  //Agregar una nota rapida
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
     
      this.setState({ text: "",modalVisible: false,ModalTitle: "Add To Do",text: "",date: fechaActual,  deadline: fechaActual, });
    }
  };

  addTaksModal = () => {

    this.setState({ ModalTitle: "Add To Do", modalVisible: true });
 

  }
  cancel = () => {
    
    this.setState({ text: "",date: fechaActual,deadline: fechaActual,modalVisible: false,ModalTitle: "Add To Do"  });
  
  }


  //Elimina el card seleccionado
  deleteTask(key, index) {
    db.ref('/tareas').child(key).remove();
  };

  //Metodo para editar el contenido de card, la idea es hacerlo en un card
  editTask = (i, item) => {
    
    this.setState({ key: i ,ModalTitle: "Edit To Do",text: item.description,date: item.date,deadline: item.deadline,modalVisible: true });



  }

  changeStatus(i, estado) {
    status = !estado;
    db.ref('/tareas/' + i + "/").update({
      status: status
    });
  }


  filtrando(){
    filtra = this.state.filtroActual;
      if (filtra == 'All') {

      } else if (filtra == 'To do') {
        tareas = [];
        llaves = [];
        this.state.tasks.forEach(element => {
          if (!element.status) {
            tareas.push(element);
          }
        });
        this.state.keys.forEach(element => {
          if (!element.status) {
            llaves.push(element);
          }
        });
        this.setState({ tasks: tareas });
        this.setState({ keys: llaves });
      }
      else if (filtra == 'Done') {
        tareas = [];
        llaves = [];
        this.state.tasks.forEach(element => {
          if (element.status) {
            tareas.push(element);
          }
        });
        this.state.keys.forEach(element => {
          if (element.status) {
            llaves.push(element);
          }
        });
        this.setState({ tasks: tareas });
        this.setState({ keys: llaves });
      }
      //////////////Flitrar por fecha actual/////////////////////////
      else if (filtra == 'Today') {
        tareas = [];
        llaves = [];
        this.state.tasks.forEach(element => {
          if (element.date == fechaActual) {
            tareas.push(element);
          }
        });
        this.state.keys.forEach(element => {
          if (element.date == fechaActual) {
            llaves.push(element);
          }
        });
        this.setState({ tasks: tareas });
        this.setState({ keys: llaves });
      }
      ///////////////////////////////////
      //Filtrar por este mes
      else if (filtra == 'This Month') {
        tareas = [];
        llaves = [];
        this.state.tasks.forEach(element => {
          mes2 = element.date + "";
          mes2 = mes2.substr(3, 2);
          if (mes2 == mes1) {
            tareas.push(element);
          }
        });
        this.state.keys.forEach(element => {
          mes2 = element.date + "";
          mes2 = mes2.substr(3, 2);
          if (mes2 == mes1) {
            llaves.push(element);
          }
        });
        this.setState({ tasks: tareas });
        this.setState({ keys: llaves });
      }
  }


  componentDidMount() {
    const { currentUser } = fire.auth()
    this.setState({ currentUser })
<<<<<<< HEAD
    
    db.ref('/tareas').on('value', snapshot => {
      let data = snapshot.val();
      let keys = Object.keys(data);
      let tasks = Object.values(data);
      this.setState({ tasks });
      this.setState({ keys: keys });
      
      });   
      

=======
  //  db.ref('/tareas').on('value', snapshot => {
   //   Alert.alert("indicador");
     //this.filtrando();

  //  });

    db.ref('/Filtro/estado').on('value', snapshot => {
      Alert.alert("Indicador filtro");
      let estado = snapshot.val();
      let est = Object.values(estado) + '';
      this.setState({ filtroActual: est });
      db.ref('/tareas').on('value', snapshot => {
        data = snapshot.val();
        keys = Object.keys(data);
        tasks = Object.values(data);
        this.setState({ tasks });
        this.setState({ keys: keys });
      });
      this.filtrando();
     
    });
    //////////////////////////////////////////////////////


    //   filtra = this.state.filtroActual;
    //  db.ref('/tareas').on('value', snapshot => {
    //  let data = snapshot.val();
    //   let keys = Object.keys(data);
    //    let tasks = Object.values(data);

    //    if (filtra == 'All') {
    //      this.setState({ tasks });
    //      this.setState({ keys: keys });
    //    }
    //  });
    // Alert.alert(currentUser.email + "");
>>>>>>> 9e3e73e965b6966698bcb3ec4b47231c2d095599
  }



  render() {
    console.disableYellowBox = true;
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}>

        <FlatList style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View style={styles.eventBox}>
              <View style={styles.eventContent}>
                <View style={styles.card_header}>
                  <CheckBox style={styles.card_done} checkedCheckBoxColor="#87B56A" onClick={() => {
                    this.changeStatus(this.state.keys[index], item.status)
                  }} isChecked={item.status} />
                  <Text style={styles.card_title}></Text>
                  <TouchableOpacity style={styles.card_delete} onPress={() => this.deleteTask(this.state.keys[index], index)}  >
                    <Image source={require('./../images/delete.png')} style={styles.delete_button} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.card_event} onPress={() => this.editTask(this.state.keys[index], item)}>
                  <View style={styles.card_header} >
                    <Text style={styles.eventTime}>Date: {item.date}</Text>
                    <Text style={styles.card_title}></Text>
                    <Text style={styles.eventTime}>Deadline: {item.deadline}</Text>
                  </View>
                  <Text style={styles.description}>Description:</Text>
                  <Text multiline={true} numberOfLines={4} style={styles.description}>{item.description}</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.SaveTask}
          value={this.state.text}
          placeholder="Add Task"
          returnKeyType="done"
          returnKeyLabel="done"
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.addTaksModal() }} style={styles.TouchableOpacityStyle} >
          <Image source={require('./../images/add1.png')} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>


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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
