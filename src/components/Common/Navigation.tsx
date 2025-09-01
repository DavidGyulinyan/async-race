import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <Link to="/">Garage</Link>
      <Link to="/winners">Winners</Link>
    </nav>
  );
};

export default Navigation;
