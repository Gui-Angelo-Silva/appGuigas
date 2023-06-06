import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from '../../services/connectionFirebase';

const Separator = () => <View style={styles.separator} />;

export default function Login({ changeStatus }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('login');

  //metodo handleLogun para verificar se é Login ou não
  function handleLogin() {
    if (type === 'login') {
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })
    } else {
      // Aqui cadastramos o usuario
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.usuario}
        source={require('../../assets/logo.png')}
      />
      <SafeAreaView>
        <TextInput
          label="E-mail"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon icon="email" />}
        />
        <TextInput
          style={styles.input}
          //mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === 'login' ? '#4682B4' : '#141414' },
        ]}
        onPress={handleLogin}>
        <Text style={styles.loginText}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{ textAlign: 'center' }}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignContent: 'center',
  },
  usuario: {
    alignContent: 'center',
    margin: 'auto',
    width: 300,
    height: 300,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#DFB4FF',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    alignContent: 'auto',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: '#141414',
    alignIcon: 'right'
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginTop: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 24,
  },
});