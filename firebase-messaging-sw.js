importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDrrjEQ6kCmW4OWAk6lGPTpAiIiwjrAym8",
    authDomain: "flames-775e4.firebaseapp.com",
    projectId: "flames-775e4",
    storageBucket: "flames-775e4.firebasestorage.app",
    messagingSenderId: "573716313116",
    appId: "1:573716313116:web:b4d7fcef890709b5ef1bd9",
    measurementId: "G-52F4YX1D16"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
}); 