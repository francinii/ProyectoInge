// SignUp.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import { fire } from '../config';

 class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

handleSignUp = () => {
  const { email, password } = this.state;
  fire.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.props.navigation.navigate('Acceder');
    })
    .catch((error) => {
      const { code, message } = error;
      Alert.alert(
        'Error de registro',
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
        <Text>Registrarse</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: "1%", margin: 4, width:'90%' }}>
        <Button title="Sign up" onPress={this.handleSignUp} color="#87B56A" />
        <Button
          title="Login" color="#87B56A"
          onPress={() => this.props.navigation.navigate('Acceder')}
        /> 
        </View>
      </View>
    )
  }
}

export default SignUp;

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
  }
})