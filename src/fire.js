import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: 'AIzaSyAxn2GMkQD8zYgaedV0kKY8r_rkMbdXpqY',
  authDomain: 'sap-catalog.firebaseapp.com',
  databaseURL: 'https://sap-catalog.firebaseio.com',
  projectId: 'sap-catalog',
  storageBucket: 'sap-catalog.appspot.com',
  messagingSenderId: '615748337599',
  appId: '1:615748337599:web:b7ce13ede7fccd1e8eeb0a',
  measurementId: 'G-N7F3985BRS'
}
var fire = firebase.initializeApp(config)

export default fire
