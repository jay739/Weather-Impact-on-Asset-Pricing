import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWebSocket } from '../../hooks/useWebSocket';
import './RealTimeChart.css';

interface ChartData {
  timestamp: string;
  price: number;
  prediction: number;
  weatherImpact: number;
}

const RealTimeChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  
  const { isConnected, error } = useWebSocket({
    url: 'ws://localhost:8000/ws/market-data',
    onMessage: (newData) => {
      setData(prevData => [...prevData, newData].slice(-50));
    },
  });

  return (
    <motion.div 
      className="real-time-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="chart-header">
        <h3>Real-Time Market Analysis</h3>
        <div className="connection-status">
          {isConnected ? (
            <span className="status connected">●</span>
          ) : (
            <span className="status disconnected">●</span>
          )}
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            dot={false}
            name="Current Price"
          />
          <Line 
            type="monotone" 
            dataKey="prediction" 
            stroke="#82ca9d" 
            strokeDasharray="5 5"
            dot={false}
            name="Predicted"
          />
          <Line 
            type="monotone" 
            dataKey="weatherImpact" 
            stroke="#ffc658" 
            dot={false}
            name="Weather Impact"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default RealTimeChart;