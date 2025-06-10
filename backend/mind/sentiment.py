from textblob import TextBlob

def analyze_sentiment(text: str) -> dict:
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    
    if polarity >= 0.3:
        sentiment = "positive"
    elif polarity <= -0.3:
        sentiment = "negative"
    else:
        sentiment = "neutral"
        
    return {
        "sentiment": sentiment,
        "polarity": polarity
}
