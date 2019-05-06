import React, { Component } from 'react'
import { Modal, View, Alert, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';


class TaskView extends Component{

  constructor(props) {
    super(props);
    }


    // changeTextHandler = text => {
    //   this.setState({ text: text });
    // };

    render() {
      return(
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Date:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.actualDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate={this.props.actualDate}//Ejemplo "01-01-2019"                
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
                onDateChange={this.props.dateHandler}
              />

              <Text>Deadline:</Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.props.deadline} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate={this.props.actualDate}//Ejemplo "01-01-2019" 
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
                onDateChange={this.props.dateHandler}
              //Podemos cambiar esto para que 
              //se guarde al darle al btn gurardar
              />

              <Text>Description:</Text>
              <TextInput
                onChangeText={this.props.textHandler}
                value={this.props.text}
                placeholder="Add Task"
                returnKeyType="done"
                returnKeyLabel="done"
              />


              <Button
                onPress={this.props.save}
                title="Save"
                color="#841584"
                accessibilityLabel="Save"
              />

              <Button
                onPress={this.props.cancel}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Save"
              />

            </View>
          </View>
        </Modal>
      );
    }


}

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  text: {
    fontSize: 20,
    marginLeft: 150
  }
})

export default TaskView;