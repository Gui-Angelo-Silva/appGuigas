import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity, Keyboard, FlatList, ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function GerenciarProdutos() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [key, setKey] = useState('');

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
                left={<TextInput.Icon icon="sack" />}
                style={styles.input}
                onChangeText={(texto) => setPreco(texto)}
                value={preco}
            />
            <TextInput
                placeholder='Descrição'
                left={<TextInput.Icon icon="color" />}
                style={styles.input}
                onChangeText={(texto) => setDescricao(texto)}
                value={descricao}
            />
        </View>
    );
} 
