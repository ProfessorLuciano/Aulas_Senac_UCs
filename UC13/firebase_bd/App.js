import React, { useState } from 'react'
import { 
  StyleSheet,
  StatusBar,
  Text, 
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

export default function App() {
  const [ nome, setNome ] = useState('')
  const [ cidade, setCidade ] = useState('')

  async function handleEnviar(){
    alert(nome + ' ' + cidade)
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.textoTitulo}>Banco Firebase</Text>
      <TextInput
      style={styles.textInput}
      placeholder='Digite seu nome'
      value={nome}
      onChangeText={setNome}
      />
      <TextInput
      style={styles.textInput}
      placeholder='Digite sua cidade'
      value={cidade}
      onChangeText={setCidade}
      />

      <TouchableOpacity onPress={handleEnviar} style={styles.buttonEnviar}>
        <Text style={styles.textoButtonEnviar}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30
  },
  textoTitulo:{
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold'
  },
  textInput: {
    margin: 10,
    height: 60,
    width: '95%',
    textAlign: 'center',
    fontSize: 25,
    borderWidth: 1,
    borderRadius: 8    
  },
  buttonEnviar: {
    marginTop: 20,
    backgroundColor: '#006CF0',
    height: 60,
    width: '95%',
    borderRadius: 8,
  },
  textoButtonEnviar: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 6.25
  }
});