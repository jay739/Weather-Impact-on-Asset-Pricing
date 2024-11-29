# src/backend/models/weather.py

import pandas as pd
import numpy as np
from typing import Dict, List, Optional
import requests
from datetime import datetime, timedelta
import logging
from requests.exceptions import RequestException

class WeatherAnalyzer:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or "837e3aa3e9bd23e14852820651a8b516"  # Replace with your OpenWeatherMap API key
        self.base_url = "http://api.openweathermap.org/data/2.5"
        self.geo_url = "http://api.openweathermap.org/geo/1.0/direct"
        
    def get_location_coordinates(self, location: str) -> Dict[str, float]:
        """Get latitude and longitude for a location."""
        try:
            params = {
                "q": location,
                "limit": 1,
                "appid": self.api_key
            }
            response = requests.get(self.geo_url, params=params)
            response.raise_for_status()
            
            location_data = response.json()
            if not location_data:
                raise ValueError(f"Location not found: {location}")
                
            return {
                "lat": location_data[0]["lat"],
                "lon": location_data[0]["lon"]
            }
        except RequestException as e:
            logging.error(f"Error fetching location coordinates: {str(e)}")
            raise

    def fetch_historical_weather(self, location: str, start_date: datetime, 
                               end_date: datetime) -> pd.DataFrame:
        """
        Fetch historical weather data for a given location and date range.
        """
        try:
            coords = self.get_location_coordinates(location)
            weather_data = []
            current_date = start_date

            while current_date <= end_date:
                unix_timestamp = int(current_date.timestamp())
                params = {
                    "lat": coords["lat"],
                    "lon": coords["lon"],
                    "dt": unix_timestamp,
                    "appid": self.api_key,
                    "units": "metric"  # Use metric units
                }

                response = requests.get(f"{self.base_url}/onecall/timemachine", params=params)
                response.raise_for_status()
                data = response.json()

                daily_weather = self._process_daily_weather(data, current_date)
                weather_data.append(daily_weather)
                current_date += timedelta(days=1)

            return pd.DataFrame(weather_data)
        except Exception as e:
            logging.error(f"Error fetching historical weather data: {str(e)}")
            raise

    def _process_daily_weather(self, data: Dict, date: datetime) -> Dict:
        """Process raw weather data into structured format."""
        daily = data.get("current", {})
        return {
            "date": date,
            "temperature": daily.get("temp", None),
            "feels_like": daily.get("feels_like", None),
            "humidity": daily.get("humidity", None),
            "clouds": daily.get("clouds", None),
            "wind_speed": daily.get("wind_speed", None),
            "weather_main": daily.get("weather", [{}])[0].get("main", None),
            "weather_description": daily.get("weather", [{}])[0].get("description", None)
        }

    def analyze_weather_patterns(self, weather_data: pd.DataFrame) -> Dict:
        """
        Analyze weather patterns and identify significant conditions.
        """
        analysis = {
            "extreme_events": self._detect_extreme_events(weather_data),
            "patterns": self._identify_weather_patterns(weather_data),
            "statistics": self._calculate_weather_statistics(weather_data)
        }
        return analysis

    def _detect_extreme_events(self, data: pd.DataFrame) -> List[Dict]:
        """
        Detect extreme weather events based on thresholds.
        """
        extreme_events = []
        
        # Temperature extremes
        temp_threshold = 35  # Celsius
        extreme_temp = data[data["temperature"] > temp_threshold]
        for _, row in extreme_temp.iterrows():
            extreme_events.append({
                "date": row["date"],
                "type": "extreme_temperature",
                "value": row["temperature"],
                "threshold": temp_threshold
            })

        # Wind extremes
        wind_threshold = 20  # m/s
        extreme_wind = data[data["wind_speed"] > wind_threshold]
        for _, row in extreme_wind.iterrows():
            extreme_events.append({
                "date": row["date"],
                "type": "extreme_wind",
                "value": row["wind_speed"],
                "threshold": wind_threshold
            })

        return extreme_events

    def _identify_weather_patterns(self, data: pd.DataFrame) -> Dict:
        """
        Identify common weather patterns and trends.
        """
        patterns = {
            "temperature_trend": self._calculate_trend(data["temperature"]),
            "weather_type_frequency": data["weather_main"].value_counts().to_dict(),
            "correlation_with_humidity": data["temperature"].corr(data["humidity"])
        }
        return patterns

    def _calculate_weather_statistics(self, data: pd.DataFrame) -> Dict:
        """
        Calculate basic weather statistics.
        """
        return {
            "temperature": {
                "mean": data["temperature"].mean(),
                "std": data["temperature"].std(),
                "min": data["temperature"].min(),
                "max": data["temperature"].max()
            },
            "humidity": {
                "mean": data["humidity"].mean(),
                "std": data["humidity"].std()
            },
            "wind_speed": {
                "mean": data["wind_speed"].mean(),
                "max": data["wind_speed"].max()
            }
        }

    def _calculate_trend(self, series: pd.Series) -> str:
        """
        Calculate the trend direction of a time series.
        """
        if len(series) < 2:
            return "insufficient_data"
            
        slope = np.polyfit(range(len(series)), series, 1)[0]
        if slope > 0.1:
            return "increasing"
        elif slope < -0.1:
            return "decreasing"
        else:
            return "stable"

    def get_weather_alerts(self, location: str) -> List[Dict]:
        """
        Get current weather alerts for a location.
        """
        try:
            coords = self.get_location_coordinates(location)
            params = {
                "lat": coords["lat"],
                "lon": coords["lon"],
                "appid": self.api_key,
                "exclude": "current,minutely,hourly,daily"
            }
            
            response = requests.get(f"{self.base_url}/onecall", params=params)
            response.raise_for_status()
            
            data = response.json()
            alerts = data.get("alerts", [])
            
            return [{
                "event": alert.get("event"),
                "description": alert.get("description"),
                "start": datetime.fromtimestamp(alert.get("start")),
                "end": datetime.fromtimestamp(alert.get("end"))
            } for alert in alerts]
        except Exception as e:
            logging.error(f"Error fetching weather alerts: {str(e)}")
            raise