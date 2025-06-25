import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_daily_prompt():
    system_prompt = (
        "You are a gentle journaling coach. "
        "Generate one short journaling prompt (1 sentence, 20 words max) "
        "that encourages self-reflection, mindfulness, or emotional awareness."
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "Give me today's journaling prompt."}
        ],
        max_tokens=50,
        temperature=0.7,
    )

    prompt = response.choices[0].message.content.strip()
    return prompt