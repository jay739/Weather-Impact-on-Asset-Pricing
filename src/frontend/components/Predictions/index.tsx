import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Predictions.css';

interface PredictionData {
  date: string;
  actual: number | null;
  predicted: number;
  confidence: number;
}

const Predictions = () => {
  // Dummy prediction data - will be replaced with ML model predictions
  const [predictionData] = useState<PredictionData[]>([
    { date: '2024-01', actual: 150.5, predicted: 152.3, confidence: 0.85 },
    { date: '2024-02', actual: 155.2, predicted: 154.8, confidence: 0.82 },
    { date: '2024-03', actual: 158.7, predicted: 157.9, confidence: 0.88 },
    { date: '2024-04', actual: null, predicted: 162.4, confidence: 0.79 },
    { date: '2024-05', actual: null, predicted: 165.1, confidence: 0.75 },
  ]);

  return (
    <motion.div 
      className="predictions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="predictions-header">
        <h1>ML Predictions</h1>
        <p>Machine Learning based market predictions with weather factors</p>
      </div>

      <div className="predictions-grid">
        {/* Main Prediction Chart */}
        <motion.div 
          className="prediction-card main-chart"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Price Predictions</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#4CAF50" 
                name="Actual Price"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#2196F3" 
                name="Predicted Price"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Confidence Metrics */}
        <motion.div 
          className="prediction-card metrics"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Model Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-header">
                <h4>Model Accuracy</h4>
                <span className="metric-value high">85%</span>
              </div>
              <div className="metric-progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-header">
                <h4>Weather Impact Factor</h4>
                <span className="metric-value medium">62%</span>
              </div>
              <div className="metric-progress">
                <div className="progress-bar" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-header">
                <h4>Sentiment Weight</h4>
                <span className="metric-value">45%</span>
              </div>
              <div className="metric-progress">
                <div className="progress-bar" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prediction Factors */}
        <motion.div 
          className="prediction-card factors"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Key Prediction Factors</h3>
          <div className="factors-list">
            <div className="factor-item positive">
              <span className="factor-icon">↗️</span>
              <div className="factor-content">
                <h4>Rising Temperature Trend</h4>
                <p>Positive correlation with market performance</p>
                <span className="impact-badge high">High Impact</span>
              </div>
            </div>

            <div className="factor-item negative">
              <span className="factor-icon">↘️</span>
              <div className="factor-content">
                <h4>Precipitation Forecast</h4>
                <p>Expected to affect trading volume</p>
                <span className="impact-badge medium">Medium Impact</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Predictions;