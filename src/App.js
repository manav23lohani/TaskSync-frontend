import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import { useAuth } from './Contexts/AuthContext';
import { ToastContainer } from "react-toastify";
import UpdateProject from './Components/UpdateProject';
import Notifications from './Components/Notifications';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const { loggedIn } = useAuth();
  return (
    <BrowserRouter>
    <Routes>
        {loggedIn && <Route path="/" element={<Dashboard/>} />}
        {loggedIn && <Route path="/addproject" element={<AddProject/>} />}
        {loggedIn && <Route path="/notifications" element={<Notifications/>} />}
        {loggedIn && <Route path="/updateproject" element={<UpdateProject/>} />}

        {!loggedIn && <Route path="/" element={<SignIn/>} />}

        {!loggedIn && <Route path="/signup" element={<SignUp/>} />}
        {!loggedIn && <Route path="/signin" element={<SignIn/>} />}
        <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    <ToastContainer/>

    </BrowserRouter>
  );
}

export default App;
