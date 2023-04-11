import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
} from 'react-native';

import * as React from 'react';

const Separator = () => <View style={styles.separator} />;

import { Card } from 'react-native-paper';

class TelaPrincipal extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Text style={styles.paragraph}>Autopeças</Text>
        <SafeAreaView>
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            title="ACESSAR"
            color="#505045"
            accessibilityLabel="Learn more about this purple button"
          />

          <Separator />
          <Button
            onPress={''}
            title="AJUDA"
            color="#a8a39d"
            accessibilityLabel="Learn more about this purple button"
          />
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignContent: 'center',
    //textAlign:'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    alignContent: 'center',
    margin: 'auto',
    width: 300,
    height: 300
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    height: 30,
    width: 300,
  }
});

export default TelaPrincipal;
