import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from typing import Dict, List

class FinanceAnalyzer:
    def __init__(self):
        self.scaler = StandardScaler()
        
    def fetch_stock_data(self, ticker: str, start_date, end_date) -> pd.DataFrame:
        """Fetch stock data using yfinance"""
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(start=start_date, end=end_date)
            return data
        except Exception as e:
            raise Exception(f"Error fetching stock data: {str(e)}")
    
    def calculate_technical_indicators(self, data: pd.DataFrame) -> pd.DataFrame:
        """Calculate technical indicators"""
        df = data.copy()
        
        # Moving averages
        df['MA20'] = df['Close'].rolling(window=20).mean()
        df['MA50'] = df['Close'].rolling(window=50).mean()
        
        # RSI
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['RSI'] = 100 - (100 / (1 + rs))
        
        return df
    
    def combine_analysis(self, stock_data: pd.DataFrame, weather_data: pd.DataFrame) -> Dict:
        """Combine stock and weather data analysis"""
        # Calculate correlations
        combined_data = pd.merge(
            stock_data,
            weather_data,
            left_index=True,
            right_index=True
        )
        
        correlations = {}
        for weather_col in ['temperature', 'precipitation']:
            if weather_col in combined_data.columns:
                corr = combined_data['Close'].corr(combined_data[weather_col])
                correlations[f'{weather_col}_correlation'] = corr
        
        # Calculate metrics
        metrics = {
            'price_change': stock_data['Close'].pct_change().mean() * 100,
            'volatility': stock_data['Close'].pct_change().std() * 100,
            'correlations': correlations
        }
        
        return metrics