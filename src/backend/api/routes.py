from fastapi import APIRouter, HTTPException
from typing import List, Dict
from datetime import datetime
from ..services.data_service import DataIntegrationService

router = APIRouter()
service = DataIntegrationService()

@router.post("/analyze")
async def analyze_data(
    ticker: str,
    location: str,
    start_date: datetime,
    end_date: datetime
):
    try:
        analysis_results = await service.perform_analysis(
            ticker, location, start_date, end_date
        )
        return analysis_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/predictions/{ticker}")
async def get_predictions(
    ticker: str,
    days: int = 7
):
    try:
        predictions = await service.generate_future_predictions(ticker, days)
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/weather-alerts/{location}")
async def get_weather_alerts(location: str):
    try:
        alerts = await service.get_weather_alerts(location)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))