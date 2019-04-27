import React from './node_modules/react'
import { Modal, View, Image, Text, StyleSheet } from 'react-native';

const DisplayModal = (props) => (
  <Modal visible={ props.display } animationType = "slide" 
         onRequestClose={ () => console.log('closed') }>>
    <View>  
      <Text style = { styles.text }>
        { props.data }
      </Text>
    </View>
  </Modal>
)

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

export default DisplayModal;