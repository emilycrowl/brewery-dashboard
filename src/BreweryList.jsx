import React from 'react';
import { Link } from 'react-router-dom';

const BreweryList = ({ breweries }) => {
  return (
    <div>
      <h2>Brewery List</h2>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/breweries/${brewery.id}`}>
              {brewery.name} - {brewery.city}, {brewery.state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;
