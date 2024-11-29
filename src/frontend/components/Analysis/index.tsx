import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Analysis.css';

interface SentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

const Analysis = () => {
  // Dummy sentiment data - will be replaced with real NLP analysis
  const [sentimentData] = useState<SentimentData[]>([
    { date: '2024-01', positive: 65, negative: 12, neutral: 23 },
    { date: '2024-02', positive: 58, negative: 18, neutral: 24 },
    { date: '2024-03', positive: 70, negative: 10, neutral: 20 },
    { date: '2024-04', positive: 52, negative: 25, neutral: 23 },
    { date: '2024-05', positive: 63, negative: 15, neutral: 22 },
  ]);

  return (
    <motion.div 
      className="analysis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="analysis-header">
        <h1>Sentiment Analysis</h1>
        <p>Natural Language Processing of financial news and weather reports</p>
      </div>

      <div className="analysis-grid">
        <motion.div 
          className="analysis-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Sentiment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="positive" 
                stackId="1" 
                stroke="#4CAF50" 
                fill="#4CAF50" 
                fillOpacity={0.6} 
              />
              <Area 
                type="monotone" 
                dataKey="negative" 
                stackId="1" 
                stroke="#f44336" 
                fill="#f44336" 
                fillOpacity={0.6} 
              />
              <Area 
                type="monotone" 
                dataKey="neutral" 
                stackId="1" 
                stroke="#2196F3" 
                fill="#2196F3" 
                fillOpacity={0.6} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="analysis-card news-feed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Latest News Analysis</h3>
          <div className="news-list">
            {/* News items will be populated here */}
            <div className="news-item positive">
              <span className="sentiment-badge">Positive</span>
              <h4>Market shows strong recovery amid favorable weather conditions</h4>
              <p>Confidence: 89%</p>
            </div>
            <div className="news-item negative">
              <span className="sentiment-badge">Negative</span>
              <h4>Storm warnings affect trading patterns in coastal regions</h4>
              <p>Confidence: 75%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analysis;