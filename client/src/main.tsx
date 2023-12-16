import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import { initializeApp } from "firebase/app";
import React from 'react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { TripProvider } from './contexts/TripContext.tsx';

const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<TripProvider>
					<App />
				</TripProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
