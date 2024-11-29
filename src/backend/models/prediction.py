import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import torch
import torch.nn as nn

class StockPricePredictor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.rf_model = RandomForestRegressor(n_estimators=100)
        self.features = ['price', 'volume', 'temperature', 'precipitation', 'sentiment_score']
        
    def prepare_features(self, stock_data, weather_data, sentiment_data):
        """Combine and prepare features for prediction"""
        combined_data = pd.merge(
            stock_data,
            weather_data,
            on='date'
        )
        combined_data = pd.merge(
            combined_data,
            sentiment_data,
            on='date'
        )
        
        X = combined_data[self.features]
        y = combined_data['target_price']
        
        return self.scaler.fit_transform(X), y
        
    def train_model(self, X, y):
        """Train the random forest model"""
        self.rf_model.fit(X, y)
        
    def predict(self, X):
        """Make predictions"""
        X_scaled = self.scaler.transform(X)
        return self.rf_model.predict(X_scaled)

# Deep Learning Model
class LSTMPredictor(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(LSTMPredictor, self).__init__()
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        self.lstm = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, 1)
        
    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        predictions = self.fc(lstm_out[:, -1, :])
        return predictions