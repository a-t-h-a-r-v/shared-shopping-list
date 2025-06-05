import React from 'react';

function About() {
  return (
    <div style={styles.aboutContainer}>
      <h1 style={styles.heading}>About Shared Shopping List</h1>
      <p style={styles.paragraph}>
        Welcome to Shared Shopping List, your go-to application for collaborative grocery and shopping management!
        We believe that planning and shopping should be a shared, seamless experience, free from forgotten items
        or duplicate purchases.
      </p>
      <p style={styles.paragraph}>
        Our platform allows you to create multiple shopping lists, share them with family members, roommates, or
        friends, and watch as updates happen in real-time. Whether you're planning a weekly grocery run,
        preparing for a party, or coordinating household supplies, Shared Shopping List keeps everyone on the
        same page.
      </p>
      <p style={styles.paragraph}>
        Built with modern web technologies, our application provides a fast, responsive, and intuitive interface.
        We prioritize user experience, security, and real-time synchronization to ensure your shopping experience
        is as efficient and enjoyable as possible.
      </p>
      <p style={styles.paragraph}>
        Thank you for choosing Shared Shopping List. Happy shopping!
      </p>
      <div style={styles.contactInfo}>
        <h3>Contact Us</h3>
        <p>If you have any questions or feedback, please reach out to us at:</p>
        <p><a href="mailto:support@sharedshoppinglist.com" style={styles.link}>support@sharedshoppinglist.com</a></p>
      </div>
    </div>
  );
}

const styles = {
  aboutContainer: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    fontFamily: "'Inter', sans-serif",
    color: '#333',
    lineHeight: 1.7,
  },
  heading: {
    fontSize: '2.5em',
    color: '#007bff',
    marginBottom: '25px',
    textAlign: 'center',
    fontWeight: 700,
  },
  paragraph: {
    fontSize: '1.1em',
    marginBottom: '15px',
    color: '#555',
  },
  contactInfo: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    textAlign: 'center',
  },
  contactInfoH3: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '15px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#0056b3',
  },
};

export default About;
