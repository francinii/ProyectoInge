import React from "react";
import { Text, View, Button, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";


import { fire } from '../config';
const App = (props) => {
  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.BOTTOM_CENTER);

  const onPress = () => showMenu();

  function cerrarSesion() {
    fire.auth().signOut().then(function () {
      this.props.navigation.navigate('Acceder')
    }).catch(function (error) {
     //Alert.alert('No se ha podido cerrar sesion');
    });
  }


  return (
    <View style={{ flex: 1, alignItems: "flex-end", backgroundColor: "" }}>


      <TouchableOpacity activeOpacity={0.5} onPress={onPress} >
        <Image source={require('./../images/dots.png')} style={styles.dots} />
      </TouchableOpacity>


      <Text
        ref={textRef}
        style={{ fontSize: 1, textAlign: "right" }}
      >
      </Text>

      <Menu
        ref={setMenuRef}
      >
        <MenuItem onPress={hideMenu}>Perfil</MenuItem>
        <MenuItem onPress={cerrarSesion}>Cerrar Sesión</MenuItem>
      </Menu>
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  dots: {
    height: 20,
    width: 20,
  },

});
