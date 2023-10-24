import React from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App(): React.ReactElement {
  return (
    <>
      <h1>hello world</h1>
      <div className="flex space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  );
}

export default App;
