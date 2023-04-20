import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import reportWebVitals from './reportWebVitals.js';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYWFH7A-u7Z0gDItHboldGcZ-4ee0WSrM",
  authDomain: "app4-59e83.firebaseapp.com",
  projectId: "app4-59e83",
  storageBucket: "app4-59e83.appspot.com",
  messagingSenderId: "578135427840",
  appId: "1:578135427840:web:a58c47df45db6b80d901e5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
