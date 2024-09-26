import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BreweryList from './BreweryList';
import BreweryDetail from './BreweryDetail';
import BreweryChart from './BreweryChart';

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/breweries');
        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBreweries();
  }, []);

  // filter breweries based on name/city/state
  const filteredBreweries = breweries.filter((brewery) =>
    brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brewery.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <h1>Brewery Dashboard</h1>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name or state"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Render the BreweryChart */}
        <BreweryChart breweries={filteredBreweries} />

        <Routes>
          <Route path="/" element={<BreweryList breweries={filteredBreweries} />} />
          <Route path="/breweries/:id" element={<BreweryDetail breweries={filteredBreweries} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
