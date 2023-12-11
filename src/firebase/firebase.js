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

// apiKey: process.env.FIREBASE_API_KEY,
// authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// databaseURL: process.env.FIREBASE_DATABASE_URL,
// projectId: process.env.FIREBASE_PROJECT_ID,
// storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.FIREBASE_APP_ID,
// measurementId: process.env.FIREBASE_MEASUREMENT_ID

export default app
