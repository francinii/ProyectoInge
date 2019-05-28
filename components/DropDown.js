import React, { Component,  } from 'react';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { db } from '../config';
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccionado: "",
      data:[],

    }
  }
  filtrar = (text) =>{

    //Falta hacer la validacion de si el nodo Filtro no existe

  
    this.setState({seleccionado: text})
    db.ref('/Filtro/estado/').update({
    seleccionado: text
    });
  }


  render() {
    data = [{
      value: 'All',
    }, {
      value: 'To do',
    }, {
      value: 'Done',
    }, {
      value: 'Today',
    }, {
      value: 'This Month',
    }];
  //  this.setState({data: data} );

    return (
      <Dropdown
        containerStyle={{ width: 250, color: '#454545', }}
        itemColor='rgba(77,77,77, 77)'
        textColor='rgba(255,255,255, 255)'
        baseColor='rgba(255,255,255, 255)'
        selectedItemColor='rgba(77,77,77, 77)'
        disabledItemColor='rgba(77,77,77, 77)'
        data={data}
      
        onChangeText={(text) => this.filtrar(text)}
        rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dropdownPosition={1}
        pickerStyle={{
          width: 250,
          left: null,
          right: 50,
          top: 83,
          marginRight: 5,
          marginTop: 24,
        }}
      />
    );
  }
}

