import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Navigation from "./Components/Navigation/Navigation";
import Employee from "./pages/Employee/Employee";
import Admin from "./pages/Admin/Admin";
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  return (
    <Router>
      <div>
        <Navigation token={token} setToken={setToken} />
        <Routes>
          {!token && <Route path="/register" element={<Registration />} />}
          {!token && <Route path="/login" element={<Login setToken={setToken} />} />}
          {token && <Route path="/admin" element={<Admin />} />}
          {token && <Route path="/employee" element={<Employee />} />}
          {token && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
