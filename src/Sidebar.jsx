import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="sidebar">
      <h2>Filter & Search</h2>
      <input
        type="text"
        placeholder="Search by name or state"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Add a Link to the Home page */}
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
