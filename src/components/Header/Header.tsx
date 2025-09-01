import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
      <h1>Async Race</h1>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Garage</Link>
        <Link to="/winners" style={{ textDecoration: 'none', color: '#333' }}>Winners</Link>
      </nav>
    </header>
  );
};

export default Header;
