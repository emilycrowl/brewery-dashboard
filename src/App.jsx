import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BreweryList from './BreweryList';
import BreweryDetail from './BreweryDetail';
import BreweryChart from './BreweryChart';
import Sidebar from './Sidebar';

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
      <div className="App" style={{ display: 'flex' }}>
        {/* Sidebar with search and navigation */}
        <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Main content area */}
        <div className="main-content" style={{ flex: 1, padding: '20px' }}>
          <h1>Brewery Dashboard</h1>
          <BreweryChart breweries={filteredBreweries} />
          <Routes>
            {/* Home route displaying the filtered list of breweries */}
            <Route path="/" element={<BreweryList breweries={filteredBreweries} />} />
            {/* Detail route displaying a single brewery */}
            <Route path="/breweries/:id" element={<BreweryDetail breweries={filteredBreweries} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
