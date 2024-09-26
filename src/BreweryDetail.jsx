import React from 'react';
import { useParams } from 'react-router-dom';

const BreweryDetail = ({ breweries }) => {
  const { id } = useParams();
  const brewery = breweries.find((b) => b.id === id);

  if (!brewery) {
    return <p>Brewery not found</p>;
  }

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>City: {brewery.city}</p>
      <p>State: {brewery.state}</p>
      <p>Website: <a href={brewery.website_url}>{brewery.website_url}</a></p>
    </div>
  );
};

export default BreweryDetail;
