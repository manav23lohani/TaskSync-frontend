import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import { AuthProvider} from './Contexts/AuthContext';
import { ProjectProvider } from './Contexts/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
  <ProjectProvider>
  <App/>

  </ProjectProvider>
  </AuthProvider>
  </React.StrictMode>
);