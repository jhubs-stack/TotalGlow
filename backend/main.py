from dotenv import load_dotenv
import os
from utils.helpers import format_timestamp
from datetime import datetime
from shared.user import get_current_user
from mind.journal import save_journal_entry, get_journal_entries
from pprint import pprint
from mind.sentiment import analyze_sentiment
from mind.prompts import generate_reflection

load_dotenv()  # Load variables from .env into environment

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if __name__ == "__main__":
    print("Loaded OpenAI Key:", OPENAI_API_KEY[:5] + "..." if OPENAI_API_KEY else "Not found")
    now = datetime.now()
    print("Current time:", format_timestamp(now))
    user = get_current_user()
    print("Current user:", user["name"])
    entry = save_journal_entry(user["id"], "Today I felt focused and calm.")
    print("Saved journal entry:", entry)
    reflection = generate_reflection(entry["content"])
    print("AI Reflection:", reflection)
    entries = get_journal_entries(user["id"])
    print("Retrieved journal entries:")
    pprint(entries)
    print("Sentiment analysis:", {
        "sentiment": entry["sentiment"],
        "polarity": entry["polarity"]
    })
