import React, { useState, useEffect, useRef } from 'react'; 
import { 
    View, Text, StyleSheet, 
    TouchableOpacity, Keyboard, FlatList, ActivityIndicator 
} from 'react-native'; 
import { TextInput } from 'react-native-paper'; 

export default function GerenciarProdutos(){
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [key, setKey] = useState('');
}