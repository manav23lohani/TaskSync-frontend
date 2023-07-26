import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import { useAuth } from './Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // const loggedIn = localStorage.getItem('accessToken') !== null;
  const { loggedIn } = useAuth();
  return (
    <BrowserRouter>
    <Routes>
        {loggedIn && <Route path="/" element={<Dashboard/>} />}
        {!loggedIn && <Route path="/" element={<SignIn/>} />}

        {!loggedIn && <Route path="/signup" element={<SignUp/>} />}
        {!loggedIn && <Route path="/signin" element={<SignIn/>} />}
        <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
