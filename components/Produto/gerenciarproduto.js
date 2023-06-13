import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, Button,
    TouchableOpacity, Keyboard, FlatList, ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Listagem from './listagem';

import firebase from '../../services/connectionFirebase'

export default function GerenciarProdutos() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [key, setKey] = useState('');
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const inputRef = useRef(null); 

    useEffect(() => { 
        async function search() { 
          await firebase.database().ref('produtos').on('value', (snapshot) => { 
            setCars([]); 

            snapshot.forEach((chilItem) => { 
              let data = { 
                //de acordo com a chave de cada item busca os valores 
                //cadastrados na relação e atribui nos dados 
                key: chilItem.key, 
                nome: chilItem.val().nome, 
                marca: chilItem.val().marca, 
                preco: chilItem.val().preco, 
                cor: chilItem.val().cor, 
              }; 
              setCars(oldArray => [...oldArray, data].reverse()); 
            }) 
            setLoading(false); 
          }) 
        } 
        search(); 
      }, []); 

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

    //método para limpar os campos com valores
    function clearFields(){
        setNome('');
        setMarca('');
        setPreco('');
        setCor('');
    }

    //função para excluir um item  
function handleDelete(key) { 
    firebase.database().ref('produtos').child(key).remove() 
      .then(() => { 
        //todos os itens que forem diferentes daquele que foi deletado 
        //serão atribuidos no array 
        const findProduto = produtos.filter(item => item.key !== key) 
        setProdutos(findProduto) 
      }) 
  } 

  //função para editar  
  function handleEdit(data) { 
      setKey(data.key), 
      setNome(data.nome), 
      setMarca(data.marca), 
      setPreco(data.preco), 
      setCor(data.cor) 
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
                ref={inputRef}
            />
            <TextInput
                placeholder='Marca'
                left={<TextInput.Icon icon="sale" />}
                style={styles.input}
                onChangeText={(texto) => setMarca(texto)}
                value={marca}
                ref={inputRef}
            />
            <TextInput
                placeholder='Preço'
                left={<TextInput.Icon icon="cash" />}
                style={styles.input}
                onChangeText={(texto) => setPreco(texto)}
                value={preco}
                ref={inputRef}
            />
            <TextInput
                placeholder='Cor'
                left={<TextInput.Icon icon="color" />}
                style={styles.input}
                onChangeText={(texto) => setCor(texto)}
                value={cor}
                ref={inputRef}
            />
            <View style={styles.button}>
                <Button
                    onPress={insertUpdate}
                    title="Adicionar"
                    color="#080"
                />
            </View>
            <View> 
                <Text style={styles.listar}>Listagem de Produtos</Text> 
            </View> 

            {loading ? 
                ( 
                    <ActivityIndicator color="#121212" size={45} /> 
                ) : 
                ( 
                    <FlatList 
                        keyExtractor={item => item.key} 
                        data={produtos} 
                        renderItem={({ item }) => ( 
                            <Listagem data={item} deleteItem={handleDelete} 
                                editItem={handleEdit} /> 
                        )} 
                    /> 
                ) 
            } 

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
