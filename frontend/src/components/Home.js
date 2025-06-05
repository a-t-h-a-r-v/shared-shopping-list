import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll use react-router-dom later

function Home() {
  return (
    <div style={styles.homeContainer}>
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Collaborate on Your Shopping Lists</h1>
        <p style={styles.heroSubtitle}>
          Effortlessly create, share, and manage shopping lists with family and friends in real-time.
        </p>
        <Link to="/app" style={styles.ctaButton}>
          Get Started Now
        </Link>
      </div>

      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Why Choose Shared Shopping List?</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3>Real-time Sync</h3>
            <p>See updates instantly as others add, check, or remove items.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Easy Sharing</h3>
            <p>Share your lists with anyone using a simple username.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>User Accounts</h3>
            <p>Securely manage your lists and access them from anywhere.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Simple Interface</h3>
            <p>Clean and intuitive design makes managing lists a breeze.</p>
          </div>
        </div>
      </div>

      <div style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Ready to simplify your shopping?</h2>
        <Link to="/app" style={styles.ctaButtonAlt}>
          Start Your First List
        </Link>
      </div>
    </div>
  );
}

const styles = {
  homeContainer: {
    fontFamily: "'Inter', sans-serif",
    textAlign: 'center',
    color: '#333',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    backgroundColor: '#e0f7fa',
    padding: '80px 20px',
    borderRadius: '15px',
    marginBottom: '60px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  heroTitle: {
    fontSize: '3.5em',
    color: '#007bff',
    marginBottom: '20px',
    fontWeight: 700,
  },
  heroSubtitle: {
    fontSize: '1.5em',
    color: '#555',
    marginBottom: '40px',
    lineHeight: 1.6,
  },
  ctaButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
  },
  ctaButtonHover: {
    backgroundColor: '#0056b3',
    transform: 'translateY(-2px)',
  },
  featuresSection: {
    marginBottom: '60px',
  },
  featuresTitle: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '40px',
    fontWeight: 600,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
  },
  featureCardH3: {
    fontSize: '1.8em',
    color: '#007bff',
    marginBottom: '15px',
  },
  featureCardP: {
    fontSize: '1.1em',
    color: '#666',
    lineHeight: 1.5,
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: '60px 20px',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  },
  ctaHeading: {
    fontSize: '2.2em',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 600,
  },
  ctaButtonAlt: {
    display: 'inline-block',
    padding: '14px 28px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.3)',
  },
  ctaButtonAltHover: {
    backgroundColor: '#218838',
    transform: 'translateY(-2px)',
  },
};

export default Home;
