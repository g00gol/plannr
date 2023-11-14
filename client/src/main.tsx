import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

<<<<<<< HEAD
import { initializeApp } from "firebase/app";
=======
//import { initializeApp } from "firebase/app";
import React from 'react';
>>>>>>> fd755cf (First attempt at baseline code for ts map-making)

//const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
//const app = initializeApp(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
