// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrrjEQ6kCmW4OWAk6lGPTpAiIiwjrAym8",
    authDomain: "flames-775e4.firebaseapp.com",
    projectId: "flames-775e4",
    storageBucket: "flames-775e4.firebasestorage.app",
    messagingSenderId: "573716313116",
    appId: "1:573716313116:web:b4d7fcef890709b5ef1bd9",
    measurementId: "G-52F4YX1D16",
    databaseURL: "https://flames-775e4-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messaging = firebase.messaging(); 