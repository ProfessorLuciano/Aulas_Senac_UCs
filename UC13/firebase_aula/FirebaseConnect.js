import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCv99pnlfs0K9ioL64-rFHJ0XhHazh3Jhc",
    authDomain: "aulasenac-d0291.firebaseapp.com",
    projectId: "aulasenac-d0291",
    storageBucket: "aulasenac-d0291.appspot.com",
    messagingSenderId: "492702767317",
    appId: "1:492702767317:web:c6ba51a5b37c206ff76a5c",
    measurementId: "G-Q4PD2CGTEQ"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase