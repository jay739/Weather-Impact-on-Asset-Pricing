import requests
from datetime import datetime, timedelta
import pandas as pd
from typing import Dict, List
import os
from dotenv import load_dotenv

load_dotenv()

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv('837e3aa3e9bd23e14852820651a8b516')
        self.base_url = "http://api.openweathermap.org/data/2.5"
        
    def fetch_historical_weather(self, location: str, days: int = 30) -> List[Dict]:
        """Fetch historical weather data"""
        lat, lon = self._get_coordinates(location)
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        weather_data = []
        current_date = start_date

        while current_date <= end_date:
            timestamp = int(current_date.timestamp())
            url = f"{self.base_url}/onecall/timemachine"
            params = {
                "lat": lat,
                "lon": lon,
                "dt": timestamp,
                "appid": self.api_key,
                "units": "metric"
            }
            
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                weather_data.append(self._process_weather_data(data, current_date))
            
            current_date += timedelta(days=1)
            
        return weather_data
    
    def _get_coordinates(self, location: str) -> tuple:
        """Get coordinates for a location"""
        url = "http://api.openweathermap.org/geo/1.0/direct"
        params = {
            "q": location,
            "limit": 1,
            "appid": self.api_key
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            if data:
                return data[0]["lat"], data[0]["lon"]
        raise Exception(f"Could not find coordinates for {location}")