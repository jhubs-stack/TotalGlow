import os
import json
from datetime import datetime
from pathlib import Path
from mind.sentiment import analyze_sentiment
from mind.reflection import generate_reflection

DATA_FILE = Path("data/mind_entries.json")
DATA_FILE.parent.mkdir(exist_ok=True)
JOURNAL_FILE = "journal_entries.json"

def save_journal_entry(user_id, content):
    sentiment_result = analyze_sentiment(content)
    reflection = generate_reflection(content)

    entry = {
        "user_id": user_id,
        "timestamp": datetime.now().isoformat(),
        "content": content,
        "sentiment": sentiment_result["sentiment"],
        "polarity": sentiment_result["polarity"],
        "reflection": reflection
    }

    if os.path.exists(JOURNAL_FILE):
        with open(JOURNAL_FILE, "r") as f:
            entries = json.load(f)
    else:
        entries = []

    entries.append(entry)

    with open(JOURNAL_FILE, "w") as f:
        json.dump(entries, f, indent=2)

    return entry

def get_journal_entries():
    if not os.path.exists(JOURNAL_FILE):
        return []
    with open(JOURNAL_FILE, "r") as f:
        return json.load(f)