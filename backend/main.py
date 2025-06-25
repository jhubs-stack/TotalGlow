import sys
import os
sys.path.append(os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv()

# Delay this import AFTER .env is loaded
from mind.voice_input import transcribe_audio

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from utils.helpers import format_timestamp
from datetime import datetime
from shared.user import get_current_user
from mind.journal import save_journal_entry, get_journal_entries
from pprint import pprint
from mind.sentiment import analyze_sentiment
from mind.prompts import generate_reflection
from mind.daily_prompt import generate_daily_prompt

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# CORS (allow frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local dev; tighten later for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    print("Loaded OpenAI Key:", OPENAI_API_KEY[:5] + "..." if OPENAI_API_KEY else "Not found")
    now = datetime.now()
    print("Current time:", format_timestamp(now))
    user = get_current_user()
    print("Current user:", user["name"])
    audio_path = "example_audio.m4a"
    transcription = transcribe_audio(audio_path)
    if transcription:
        print(f"📝 Transcribed text: {transcription}")
    else:
        print("⚠️ No transcription returned.")
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

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    file_location = f"temp/{file.filename}"

    import os
    os.makedirs("temp", exist_ok=True)

    with open(file_location, "wb") as f:
        f.write(await file.read())

    transcription = transcribe_audio(file_location)

    os.remove(file_location)

    # Save transcription as journal entry
    save_journal_entry(user_id="user_123", content=transcription)

    return {"transcription": transcription}

@app.get("/journal-entries")
async def get_entries():
    entries = get_journal_entries()
    return {"entries": entries}

@app.get("/daily-prompt")
async def get_daily_prompt():
    prompt = generate_daily_prompt()
    return {"prompt": prompt}