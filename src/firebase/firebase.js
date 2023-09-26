import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCfPeyWMPyIK9m0ySh0hiVdGJG82k3iE3s',
  authDomain: 'poll-app-4aa05.firebaseapp.com',
  databaseURL: 'https://poll-app-4aa05-default-rtdb.firebaseio.com',
  projectId: 'poll-app-4aa05',
  storageBucket: 'poll-app-4aa05.appspot.com',
  messagingSenderId: '572867503636',
  appId: '1:572867503636:web:6b2b9ceb7e18ca8e252901',
  measurementId: 'G-7Q9NCZNK6C'
})

export const db = app.database()
export const auth = app.auth()

export default app
