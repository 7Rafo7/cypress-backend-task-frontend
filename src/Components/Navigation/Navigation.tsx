import React from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Navigation.module.css"
import {jwtDecode} from "jwt-decode";


interface NavigationProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Navigation: React.FC <NavigationProps> = ({ token, setToken }) => {
  const navigate = useNavigate();
  //@ts-ignore
  const role = token ? jwtDecode(token).role : "";


  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  return (
    <div className={styles.nav}>
      {token ? (
        <>
          <div className={styles.navItem}>
            {role === "admin" ? (
              <Link to="/admin">Admin</Link>
            ) : (
              <Link to="/employee">Employee</Link>
            )}
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.navItem}>
            <Link to="/login">Login</Link>
          </div>
          <div className={styles.navItem}>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navigation