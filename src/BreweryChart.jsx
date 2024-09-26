import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BreweryChart = ({ breweries }) => {
  // group breweries by state
  const stateData = breweries.reduce((acc, brewery) => {
    acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    return acc;
  }, {});

  // format data for the chart
  const chartData = Object.entries(stateData).map(([state, count]) => ({
    state,
    count,
  }));

  return (
    <div>
      <h2>Breweries per State</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BreweryChart;
