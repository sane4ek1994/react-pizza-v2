import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDz9tT3_DEhFeHChJjegbfTd1Ne4ZX7gjw',
  authDomain: 'react-pizza-8a5b8.firebaseapp.com',
  projectId: 'react-pizza-8a5b8',
  storageBucket: 'react-pizza-8a5b8.appspot.com',
  messagingSenderId: '800246991313',
  appId: '1:800246991313:web:416037f5aa417eadf7b8f0',
  measurementId: 'G-P9BDFDVJ4Q'
}

initializeApp(firebaseConfig)

export const auth = getAuth()
