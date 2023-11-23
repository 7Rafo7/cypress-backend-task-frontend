import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from './Login.module.css'

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);
      setToken(token);

      const decodedToken: any = jwtDecode(token);

      if (decodedToken.role === 'admin') {
        navigate('/admin');
      } else if (decodedToken.role === 'employee') {
        navigate('/employee');
      }
    } catch (error) {
      //@ts-ignore
      console.error('Login failed', error.message);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Login</div>
      <div className={styles.cardBody}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.cardFooter}>

        <div className={styles.btn} onClick={handleLogin}>Login</div>

      </div>
    </div>
  );
};

export default Login;