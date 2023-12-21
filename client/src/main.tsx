import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

import App from "./App.tsx";
import "./index.css";
import { ContextProvider } from "./contexts/Context.tsx";

const config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
initializeApp(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>,
);
