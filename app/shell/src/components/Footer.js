import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      © 2026 Micro Frontend Workspace
    </footer>
  );
}

const styles = {
  footer: {
    padding: "10px",
    textAlign: "center",
    background: "#f3f4f6",
    marginTop: "auto"
  }
};