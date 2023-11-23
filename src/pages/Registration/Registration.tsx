import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import styles from "./Registartion.module.css"

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password, role, fullName }).then(() => {
        alert('Registration successful!');
        navigate('/login');
      });
    } catch (error: any) {
      console.error('Registration failed', error.message);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Register</div>
      <div className={styles.cardBody}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fullname"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.btn} onClick={handleRegister}>Register</div>
      </div>
    </div>
  );
}

export default Registration