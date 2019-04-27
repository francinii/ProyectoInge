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


} from "react-native";


const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default class FirstPage extends Component {
  state = {
    tasks: [],
    text: "",
    date: "00/00/0000",
    deadline: "00/00/0000",
    estado: true
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };


  //Agregar una tarea rápida
  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text, date, deadline } = prevState;
          return {
            tasks: tasks.concat(
              {
                key: tasks.length,
                text: text,
                date: date,
                deadline: deadline
              }
            ),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };


  //Elimina el card seleccionado
  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  //Metodo para editar el contenido de card, la idea es hacerlo en un card
  editTask = i => {
    alert("hola");
  }





  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
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
                  <CheckBox style={styles.card_done} color="#87B56A" checked={this.state.estado} />
                  <Text style={styles.card_title}></Text>
                 <TouchableOpacity style={styles.card_delete} onPress={() => this.deleteTask(index)}  >
                    <Image source={require('./../images/delete.png')} style={styles.delete_button} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.card_event} onPress={() => this.editTask(index)}>
                  <View style={styles.card_header} >
                    <Text style={styles.eventTime}>Date: {item.date}</Text>
                    <Text style={styles.card_title}></Text>
                    <Text style={styles.eventTime}>Deadline: {item.deadline}</Text>
                  </View>
                  <Text style={styles.description}>Description:</Text>
                  <Text style={styles.description}>{item.text}</Text>
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


        <TouchableOpacity activeOpacity={0.5} onPress={this.editTask} style={styles.TouchableOpacityStyle} >
          <Image source={require('./../images/add1.png')} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>

      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};


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

  delete_button:{
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

AppRegistry.registerComponent("TodoList", () => TodoList);