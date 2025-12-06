import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// CONFIGURACION
const FirebaseConfig={
    apiKey: "AIzaSyBY2WFUU5lquVmrNPzBf6uhuJUCVAtDN5s",
    authDomain: "reactnative-coder-199ec.firebaseapp.com",
     projectId: "reactnative-coder-199ec",
    storageBucket: "reactnative-coder-199ec.firebasestorage.app",
    messagingSenderId: "1034981190890",
    appId: "1:1034981190890:web:88ad1b4c5d470a0d8f3b93"
}

// INICIALIZACION
const app = initializeApp(FirebaseConfig)
export const auth=getAuth(app)