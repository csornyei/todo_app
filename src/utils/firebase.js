import { initializeApp } from "firebase/app";

function initFirebase() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "todo-gcloud.firebaseapp.com",
    projectId: "todo-gcloud",
    storageBucket: "todo-gcloud.appspot.com",
    messagingSenderId: "906503203722",
    appId: "1:906503203722:web:73d803d16fc051acc5f673",
    measurementId: "G-RY7EPT5D46",
  };
  return initializeApp(firebaseConfig);
}

const app = initFirebase();

export default app;
