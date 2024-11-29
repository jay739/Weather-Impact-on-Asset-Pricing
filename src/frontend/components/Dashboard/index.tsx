import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  // Dummy data - will be replaced with real data
  const [data] = useState([
    { name: 'Jan', stock: 4000, weather: 2400, sentiment: 2400 },
    { name: 'Feb', stock: 3000, weather: 1398, sentiment: 2210 },
    { name: 'Mar', stock: 2000, weather: 9800, sentiment: 2290 },
    { name: 'Apr', stock: 2780, weather: 3908, sentiment: 2000 },
    { name: 'May', stock: 1890, weather: 4800, sentiment: 2181 }
  ]);

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h1>Market Dashboard</h1>
        <p>Real-time market analysis with weather impact</p>
      </div>

      <div className="charts-grid">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Stock Price vs Weather Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stock" stroke="#8884d8" />
              <Line type="monotone" dataKey="weather" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Add more chart cards here */}
      </div>
    </motion.div>
  );
};

export default Dashboard;