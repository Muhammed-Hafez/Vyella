const firebaseConfig = {
  apiKey: "AIzaSyA12f0llfJ0NB4hPPzQCWEVUoWpGkfJAu0",
  authDomain: "vyella-73a96.firebaseapp.com",
  projectId: "vyella-73a96",
  storageBucket: "vyella-73a96.firebasestorage.app",
  messagingSenderId: "1017826239186",
  appId: "1:1017826239186:web:4434c40ebde5a61ab3430b",
  measurementId: "G-LNR0FYQK6R",
};

firebase.initializeApp(firebaseConfig);

window.db = firebase.firestore();
