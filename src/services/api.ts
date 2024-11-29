const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
    async getStockData(ticker: string, period: string = '1y') {
        try {
            const response = await fetch(`${API_BASE_URL}/stock/${ticker}?period=${period}`);
            if (!response.ok) throw new Error('Failed to fetch stock data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw error;
        }
    },

    async getWeatherData(location: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/weather/${location}`);
            if (!response.ok) throw new Error('Failed to fetch weather data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    },

    async analyzeCombinedData(ticker: string, location: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticker, location }),
            });
            if (!response.ok) throw new Error('Analysis failed');
            return await response.json();
        } catch (error) {
            console.error('Error in analysis:', error);
            throw error;
        }
    }
};