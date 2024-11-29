from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import yfinance as yf
from typing import List, Optional
import pandas as pd

from .models.finance import FinanceAnalyzer
from .models.weather import WeatherAnalyzer
from .nlp.sentiment import NLPAnalyzer

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize analyzers
finance_analyzer = FinanceAnalyzer()
weather_analyzer = WeatherAnalyzer()
nlp_analyzer = NLPAnalyzer()

class StockRequest(BaseModel):
    ticker: str
    start_date: datetime
    end_date: datetime
    location: str

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/analyze")
async def analyze_data(request: StockRequest):
    try:
        # Fetch stock data
        stock_data = finance_analyzer.fetch_stock_data(
            request.ticker,
            request.start_date,
            request.end_date
        )
        
        # Fetch weather data
        weather_data = weather_analyzer.fetch_weather_data(
            request.location,
            request.start_date,
            request.end_date
        )
        
        # Perform analysis
        combined_analysis = finance_analyzer.combine_analysis(stock_data, weather_data)
        
        return combined_analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/sentiment")
async def analyze_sentiment(text: str):
    try:
        sentiment = nlp_analyzer.analyze_text(text)
        return sentiment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/api/sentiment/{ticker}")
async def get_sentiment_analysis(ticker: str, days: int = 7):
    try:
        sentiment_analyzer = SentimentAnalyzer()
        sentiments = sentiment_analyzer.analyze_news(ticker, days)
        return {"success": True, "data": sentiments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/correlations/{ticker}")
async def get_correlations(ticker: str, location: str):
    try:
        correlation_analyzer = CorrelationAnalyzer()
        stock_data = finance_analyzer.fetch_stock_data(ticker)
        weather_data = weather_analyzer.fetch_weather_data(location)
        sentiment_analyzer = SentimentAnalyzer()
        sentiment_data = sentiment_analyzer.analyze_news(ticker)
        
        correlations = correlation_analyzer.analyze_correlations(
            stock_data, weather_data, sentiment_data
        )
        return {"success": True, "data": correlations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))