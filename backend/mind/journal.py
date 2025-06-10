import json
from datetime import datetime
from pathlib import Path
from mind.sentiment import analyze_sentiment

DATA_FILE = Path("data/mind_entries.json")
DATA_FILE.parent.mkdir(exist_ok=True)

def save_journal_entry(user_id: str, content: str) -> dict:
    sentiment = analyze_sentiment(content)
    entry = {
        "user_id": user_id,
        "content": content,
        "timestamp": datetime.now().isoformat(),
        "sentiment": sentiment["sentiment"],
        "polarity": sentiment["polarity"]
    }

    # Load existing entries
    if DATA_FILE.exists():
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(entry)

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

    return entry
    
def get_journal_entries(user_id: str) -> list:
    if not DATA_FILE.exists():
        return []
        
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
        
    user_entries = [entry for entry in data if entry["user_id"] == user_id]
    return user_entries
