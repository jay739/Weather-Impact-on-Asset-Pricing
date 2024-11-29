from transformers import pipeline
import pandas as pd
from typing import Dict, List

class NLPAnalyzer:
    def __init__(self):
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert"
        )
        
    def analyze_text(self, text: str) -> Dict:
        """Analyze sentiment of financial text"""
        try:
            result = self.sentiment_analyzer(text)[0]
            return {
                'sentiment': result['label'],
                'score': result['score'],
                'text': text
            }
        except Exception as e:
            raise Exception(f"Error in sentiment analysis: {str(e)}")
    
    def analyze_news_batch(self, news_items: List[str]) -> List[Dict]:
        """Analyze sentiment for a batch of news items"""
        try:
            results = []
            for item in news_items:
                sentiment = self.analyze_text(item)
                results.append(sentiment)
            return results
        except Exception as e:
            raise Exception(f"Error in batch sentiment analysis: {str(e)}")