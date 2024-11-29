import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './WeatherImpact.css';

interface WeatherData {
  temperature: number;
  precipitation: number;
  stockChange: number;
  date: string;
}

const WeatherImpact = () => {
  // Dummy data - will be replaced with real weather-stock correlation data
  const [weatherData] = useState<WeatherData[]>([
    { temperature: 25, precipitation: 0, stockChange: 2.3, date: '2024-01-01' },
    { temperature: 28, precipitation: 12, stockChange: -1.2, date: '2024-01-02' },
    { temperature: 22, precipitation: 5, stockChange: 0.8, date: '2024-01-03' },
    // Add more data points
  ]);

  return (
    <motion.div 
      className="weather-impact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-header">
        <h1>Weather Impact Analysis</h1>
        <p>Correlation between weather patterns and market behavior</p>
      </div>

      <div className="weather-grid">
        <motion.div 
          className="weather-card correlation-chart"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Temperature vs Stock Price Change</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis 
                dataKey="temperature" 
                name="Temperature" 
                unit="°C" 
              />
              <YAxis 
                dataKey="stockChange" 
                name="Stock Change" 
                unit="%" 
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter 
                name="Weather-Stock Correlation" 
                data={weatherData} 
                fill="#8884d8" 
              />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="weather-card metrics-panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Weather Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">Temperature Correlation</span>
              <span className="metric-value">0.65</span>
              <span className="metric-desc">Strong positive correlation</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Precipitation Impact</span>
              <span className="metric-value">-0.32</span>
              <span className="metric-desc">Moderate negative correlation</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Extreme Weather Events</span>
              <span className="metric-value">8</span>
              <span className="metric-desc">Significant market impacts</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="weather-card alerts"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Weather Alerts</h3>
          <div className="alerts-list">
            <div className="alert-item warning">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <h4>Storm Warning</h4>
                <p>Potential impact on trading volumes expected</p>
              </div>
            </div>
            <div className="alert-item info">
              <span className="alert-icon">ℹ️</span>
              <div className="alert-content">
                <h4>Temperature Trend</h4>
                <p>Above average temperatures forecasted</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherImpact;