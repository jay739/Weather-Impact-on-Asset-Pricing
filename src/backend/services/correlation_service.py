import pandas as pd
import numpy as np
from scipy import stats
from typing import Dict

class CorrelationAnalyzer:
    def analyze_correlations(self, 
                           stock_data: pd.DataFrame, 
                           weather_data: pd.DataFrame,
                           sentiment_data: pd.DataFrame) -> Dict:
        """Analyze correlations between different factors"""
        
        # Merge all data on date
        combined_data = pd.merge(stock_data, weather_data, on='date')
        combined_data = pd.merge(combined_data, sentiment_data, on='date')
        
        correlations = {
            'weather': self._analyze_weather_correlation(combined_data),
            'sentiment': self._analyze_sentiment_correlation(combined_data),
            'combined': self._analyze_combined_effects(combined_data)
        }
        
        return correlations
    
    def _analyze_weather_correlation(self, data: pd.DataFrame) -> Dict:
        """Analyze correlation between weather and stock price"""
        weather_corr = {}
        for column in ['temperature', 'precipitation', 'humidity']:
            if column in data.columns:
                correlation, p_value = stats.pearsonr(
                    data['Close'], 
                    data[column]
                )
                weather_corr[column] = {
                    'correlation': correlation,
                    'p_value': p_value
                }
        return weather_corr
    
    def _analyze_sentiment_correlation(self, data: pd.DataFrame) -> Dict:
        """Analyze correlation between sentiment and stock price"""
        sentiment_corr = {}
        if 'sentiment_score' in data.columns:
            correlation, p_value = stats.pearsonr(
                data['Close'],
                data['sentiment_score']
            )
            sentiment_corr['sentiment'] = {
                'correlation': correlation,
                'p_value': p_value
            }
        return sentiment_corr
    
    def _analyze_combined_effects(self, data: pd.DataFrame) -> Dict:
        """Analyze combined effects using multiple regression"""
        from sklearn.linear_model import LinearRegression
        
        # Prepare features
        features = ['temperature', 'precipitation', 'sentiment_score']
        X = data[features]
        y = data['Close']
        
        # Fit regression
        model = LinearRegression()
        model.fit(X, y)
        
        # Get coefficients
        effects = dict(zip(features, model.coef_))
        effects['r_squared'] = model.score(X, y)
        
        return effects