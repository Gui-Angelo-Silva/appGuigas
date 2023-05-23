import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, Button,
    TouchableOpacity, Keyboard, FlatList, ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function GerenciarProdutos() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [key, setKey] = useState('');

    async function insertUpdate() {
        //editar dados 
        if (nome !== '' & marca !== '' & preco !== '' & cor !== '' & key !== '') {
            firebase.database().ref('produtos').child(key).update({
                nome: nome, 
                marca: marca, 
                preco: preco,
                cor: cor,
            })
            Keyboard.dismiss();
            alert('Produto Editado!');
            clearFields();
            setKey('');
            return;
        }
        //cadastrar dados 
        let produtos = await firebase.database().ref('produtos');
        let chave = produtos.push().key; //comando para salvar é o push 

        produtos.child(chave).set({
            nome: nome,
            marca: marca,
            preco: preco, 
            cor: cor,
        });
        Keyboard.dismiss();
        alert('Produto Cadastrado!');
        clearFields();
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Produto'
                left={<TextInput.Icon icon="car" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setNome(texto)}
                value={nome}
            />
            <TextInput
                placeholder='Marca'
                left={<TextInput.Icon icon="sale" />}
                style={styles.input}
                onChangeText={(texto) => setMarca(texto)}
                value={marca}
            />
            <TextInput
                placeholder='Preço'
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={(texto) => setPreco(texto)}
                value={preco}
            />
            <TextInput
                placeholder='Cor'
                left={<TextInput.Icon icon="color" />}
                style={styles.input}
                onChangeText={(texto) => setCor(texto)}
                value={cor}
            />
            <View style={styles.button}>
                <Button
                    onPress={insertUpdate}
                    title="Adicionar"
                    color="#080"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#ede7d5',
    },

    separator: {
        marginVertical: 5,
    },

    button: {
        flexDirection: 'column',
        alignItems: 'center',
        //backgroundColor: '#ede7d5',
        //borderWidth: 0.5,
        //borderColor: '#fff',
        height: 40,
        borderRadius: 10,
        margin: 5,
    },

    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',

    },

    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 100,
        fontSize: 20
    },

    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },

    listar: {
        fontSize: 20,
        textAlign: 'center'
    }
});
