import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

//import { initializeApp } from "firebase/app";
import React from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';

//const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
//const app = initializeApp(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
