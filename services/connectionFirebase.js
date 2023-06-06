//biblioteca do firebase
import firebase from 'firebase/compat/app';
//autenticação de email e senha
import 'firebase/compat/auth';
//trabalha com o banco de dados criado no firebase
import 'firebase/compat/database';

let firebaseConfig = {
  apiKey: "AIzaSyCO9V7HYJeMEr3HoR27YVDIhJtxKRd3kN0",
  authDomain: "bdapplojaguigas.firebaseapp.com",
  databaseURL: "https://bdapplojaguigas-default-rtdb.firebaseio.com",
  projectId: "bdapplojaguigas",
  storageBucket: "bdapplojaguigas.appspot.com",
  messagingSenderId: "603850146083",
  appId: "1:603850146083:web:a5deb21d5526ef59574c96"
};

if (!firebase.apps.length) {
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
    }

export default firebase;