import firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyCfPeyWMPyIK9m0ySh0hiVdGJG82k3iE3s',
  authDomain: 'poll-app-4aa05.firebaseapp.com',
  databaseURL: 'https://poll-app-4aa05-default-rtdb.firebaseio.com',
  projectId: 'poll-app-4aa05',
  storageBucket: 'poll-app-4aa05.appspot.com',
  messagingSenderId: '572867503636',
  appId: '1:572867503636:web:6b2b9ceb7e18ca8e252901',
  measurementId: 'G-7Q9NCZNK6C'
})

const db = firebase.firestore()

export default db
