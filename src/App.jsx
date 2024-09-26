import React, { useEffect, useState } from 'react';

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBreweries, setFilteredBreweries] = useState([]);

  // fetch the data from the OpenBreweryDB API
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/breweries');
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data); // all data is displayed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBreweries();
  }, []);

  // search function (by name, city, or state)
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(query) || 
      brewery.city.toLowerCase().includes(query) || 
      brewery.state.toLowerCase().includes(query)
    );
    setFilteredBreweries(filtered);
  };

  // Summary Statistics
  const totalBreweries = breweries.length;
  const breweriesInCalifornia = breweries.filter(
    (brewery) => brewery.state === 'California'
  ).length;
  const averageBreweriesPerState = (
    totalBreweries / new Set(breweries.map((b) => b.state)).size
  ).toFixed(2);

  return (
    <div className="App">
      <h1>Brewery Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name or State"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Summary Statistics */}
      <div>
        <h2>Summary Statistics</h2>
        <p>Total Breweries: {totalBreweries}</p>
        <p>Breweries in California: {breweriesInCalifornia}</p>
        <p>Average Breweries per State: {averageBreweriesPerState}</p>
      </div>

      {/* Brewery List */}
      <ul>
        {filteredBreweries.map((brewery) => (
          <li key={brewery.id}>
            {brewery.name} - {brewery.city}, {brewery.state}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
