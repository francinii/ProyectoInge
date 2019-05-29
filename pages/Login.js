// Login.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import { fire } from '../config';


class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state;
    fire.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {

        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        const { code, message } = error;
        Alert.alert(
          'Error de autenticación',
          'El usuario o correo es incorrecto, por favor inténtelo nuevamente',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },

        );
      });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
         <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: "1%", margin: 4, width:'90%' }}>
        <Button title="Login" onPress={this.handleLogin} color="#87B56A"/>
        <Button title="Sign up" onPress={() => this.props.navigation.navigate('Registro')} color="#87B56A"
        /></View>
      </View>
      )
  }
}


export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  boton: {
    width: '90%',
  }

})