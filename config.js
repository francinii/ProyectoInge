import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAm3LKcgyofK2QCWtJ94hya3rkgdT03tfo",
    authDomain: "proyectoinge-4c132.firebaseapp.com",
    databaseURL: "https://proyectoinge-4c132.firebaseio.com",
    projectId: "proyectoinge-4c132",
    storageBucket: "proyectoinge-4c132.appspot.com",
    messagingSenderId: "890528070459",
    appId: "1:890528070459:web:3eca573fb1638e88"
};
// Initialize Firebase
let app = firebase.initializeApp(config);
<<<<<<< HEAD
export const fire = firebase;
=======
>>>>>>> d087ef51022a42dd4c9eb26422cd2c1522744d78
export const db = app.database();  