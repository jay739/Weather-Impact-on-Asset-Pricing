from transformers import pipeline
import pandas as pd
from typing import List, Dict
import yfinance as yf
import requests
from datetime import datetime, timedelta

class SentimentAnalyzer:
    def __init__(self):
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert"
        )
        self.news_api_key = os.getenv('NEWS_API_KEY')
    
    def analyze_news(self, ticker: str, days: int = 7) -> List[Dict]:
        """Analyze news sentiment for a stock"""
        news_articles = self._fetch_news(ticker, days)
        sentiments = []
        
        for article in news_articles:
            sentiment = self.sentiment_analyzer(article['title'])[0]
            sentiments.append({
                'date': article['publishedAt'],
                'title': article['title'],
                'sentiment': sentiment['label'],
                'score': sentiment['score']
            })
            
        return sentiments
    
    def _fetch_news(self, ticker: str, days: int) -> List[Dict]:
        """Fetch news articles for a stock"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        url = "https://newsapi.org/v2/everything"
        params = {
            "q": ticker,
            "from": start_date.strftime("%Y-%m-%d"),
            "to": end_date.strftime("%Y-%m-%d"),
            "language": "en",
            "sortBy": "publishedAt",
            "apiKey": self.news_api_key
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()['articles']
        return []