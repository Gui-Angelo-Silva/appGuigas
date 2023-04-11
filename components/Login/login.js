import React, { useState} from 'react';
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

export default function Login(changeStatus) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('login');

//metodo handleLogun para verificar se é Login ou não

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
        <Separator />
        <Button
          onPress={''}
          title="Logar"
          color="#000"
          accessibilityLabel="Learn more about this purple button"
        />
      </SafeAreaView>
      <TouchableOpacity
        style={[
          styles.handleLogin,
          { backgroundColor: type === 'login' ? '#4682B4' : '#141414' },
        ]}
        onPress={'handleLogin'}>
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
  usuario: {
    alignContent: 'center',
    margin: 'auto',
    width: 300,
    height: 300,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#a8a39d',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center'
  },
  input: {
    marginBottom: 20,
    marginLeft: 40,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    width: 320,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
    alignItems: 'auto'
  },
  loginText: {
    textAlign: 'center', 
    color: '#fff',
    borderStartColor: '#808080'
  }
});
