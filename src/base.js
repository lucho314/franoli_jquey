const firebaseConfig = {
    apiKey: "AIzaSyArzQ-MpjlLLHcM8-_GvPJAJhFjRCReO2k",
    authDomain: "norse-wavelet-134323.firebaseapp.com",
    projectId: "norse-wavelet-134323",
    storageBucket: "norse-wavelet-134323.appspot.com",
    messagingSenderId: "534296450577",
    appId: "1:534296450577:web:18267016fbb26407bf03b0",
    measurementId: "G-2JCJNY1TEY"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export var db = firebase.firestore();