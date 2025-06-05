import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assuming AuthContext is one level up

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarBrand}>
        <Link to="/" style={styles.brandLink}>
          🛒 Shared Shopping List
        </Link>
      </div>
      <ul style={styles.navbarNav}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        {user ? (
          <>
            <li style={styles.navItem}>
              <Link to="/app" style={styles.navLink}>My Lists</Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={logout} style={styles.logoutButton}>Logout ({user.username})</button>
            </li>
          </>
        ) : (
          <li style={styles.navItem}>
            <Link to="/login" style={styles.navLink}>Login / Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#343a40',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  navbarBrand: {
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  brandLink: {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  brandLinkHover: {
    color: '#007bff',
  },
  navbarNav: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    marginLeft: '25px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1em',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  navLinkHover: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  logoutButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.0em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#c82333',
  },
};

export default Navbar;
