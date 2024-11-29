import pandas as pd
import asyncio
from typing import Dict, List
from ..models.finance import FinanceAnalyzer
from ..models.weather import WeatherAnalyzer
from ..nlp.sentiment import NLPAnalyzer
from ..models.prediction import StockPricePredictor, LSTMPredictor

class DataIntegrationService:
    def __init__(self):
        self.finance_analyzer = FinanceAnalyzer()
        self.weather_analyzer = WeatherAnalyzer()
        self.nlp_analyzer = NLPAnalyzer()
        self.predictor = StockPricePredictor()
        
    async def fetch_all_data(self, ticker: str, location: str, start_date, end_date):
        """Fetch all required data concurrently"""
        tasks = [
            self.finance_analyzer.fetch_stock_data(ticker, start_date, end_date),
            self.weather_analyzer.fetch_weather_data(location, start_date, end_date),
            self.fetch_news_data(ticker, start_date, end_date)
        ]
        
        stock_data, weather_data, news_data = await asyncio.gather(*tasks)
        return stock_data, weather_data, news_data
        
    async def perform_analysis(self, ticker: str, location: str, start_date, end_date):
        """Perform comprehensive analysis"""
        # Fetch data
        stock_data, weather_data, news_data = await self.fetch_all_data(
            ticker, location, start_date, end_date
        )
        
        # Analyze data
        analysis_results = {
            'stock_analysis': self.finance_analyzer.analyze_stock(stock_data),
            'weather_impact': self.weather_analyzer.analyze_weather_patterns(weather_data),
            'sentiment_analysis': self.nlp_analyzer.analyze_news_batch(news_data),
            'predictions': self.generate_predictions(stock_data, weather_data, news_data)
        }
        
        return analysis_results
        
    def generate_predictions(self, stock_data, weather_data, news_data):
        """Generate price predictions"""
        X, y = self.predictor.prepare_features(stock_data, weather_data, news_data)
        predictions = self.predictor.predict(X)
        return predictions.tolist()