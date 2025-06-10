import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # This loads variables from .env into os.environ

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_reflection(entry_text: str) -> str:
    system_prompt = (
        "You're a kind, insightful wellness coach named GlowBot. "
        "Given a user's journal entry, respond with a brief, encouraging reflection. "
        "The tone should be calm, affirming, and uplifting — never clinical or judgmental. "
        "Focus on progress, mindfulness, and emotional awareness."
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": entry_text}
        ],
        max_tokens=80,
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()
