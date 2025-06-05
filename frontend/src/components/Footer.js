import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Shared Shopping List. All rights reserved.</p>
        <p>Made with ❤️ for collaborative shopping.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#343a40',
    color: '#f8f9fa',
    textAlign: 'center',
    padding: '25px 20px',
    marginTop: '60px',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    fontFamily: "'Inter', sans-serif",
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    fontSize: '0.95em',
  },
  footerP: {
    marginBottom: '8px',
  },
};

export default Footer;
