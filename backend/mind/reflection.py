import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_reflection(content):
    system_prompt = (
        "You are a gentle, empathetic journaling coach. "
        "Given a journal entry, provide a short 2-3 sentence reflection "
        "that helps the user gain insight or encourages self-awareness."
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Journal Entry: {content}"}
        ],
        max_tokens=150,
        temperature=0.7,
    )

    reflection = response.choices[0].message.content.strip()
    return reflection