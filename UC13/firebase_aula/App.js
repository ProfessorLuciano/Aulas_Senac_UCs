import React, { useState, useEffect } from 'react'
import firebase from './FirebaseConnect'
import {
  StatusBar,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

export default function App() {

    useEffect(() => {
      async function dados(){
        await firebase.database().ref('usuarios').child('teste').child('teste1')
      }
      dados()
    }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle={'default'} translucent={false} />
      <Text>Usando o Firebase</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
