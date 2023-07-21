import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './Contexts/User';
import App from "./App";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App/>
    </UserProvider>
  </React.StrictMode>
);