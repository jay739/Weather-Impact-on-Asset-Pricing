import React from 'react';
import { motion } from 'framer-motion';
import './MarketInsights.css';

interface Insight {
  type: 'weather' | 'sentiment' | 'technical';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

const MarketInsights = () => {
  const insights: Insight[] = [
    {
      type: 'weather',
      title: 'Storm Impact Alert',
      description: 'Upcoming storm system may affect supply chain operations',
      impact: 'negative',
      confidence: 0.85
    },
    {
      type: 'sentiment',
      title: 'Positive News Sentiment',
      description: 'Recent news coverage shows increasingly positive sentiment',
      impact: 'positive',
      confidence: 0.78
    }
  ];

  return (
    <motion.div 
      className="market-insights"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>Market Insights</h3>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className={`insight-card ${insight.impact}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="insight-header">
              <span className={`insight-type ${insight.type}`}>
                {insight.type.toUpperCase()}
              </span>
              <span className="confidence">
                {(insight.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <h4>{insight.title}</h4>
            <p>{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketInsights;