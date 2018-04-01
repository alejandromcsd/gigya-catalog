import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyC_XZKmV-YcXcTmH3InlSM_mkG4Bmazc0I',
  authDomain: 'gigya-catalog.firebaseapp.com',
  databaseURL: 'https://gigya-catalog.firebaseio.com',
  projectId: 'gigya-catalog',
  storageBucket: 'gigya-catalog.appspot.com',
  messagingSenderId: '787501563952'
}
var fire = firebase.initializeApp(config)

export default fire
