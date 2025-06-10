from dotenv import load_dotenv
import os
from utils.helpers import format_timestamp
from datetime import datetime
from shared.user import get_current_user

load_dotenv()  # Load variables from .env into environment

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if __name__ == "__main__":
    print("Loaded OpenAI Key:", OPENAI_API_KEY[:5] + "..." if OPENAI_API_KEY else "Not found")
    now = datetime.now()
    print("Current time:", format_timestamp(now))
    user = get_current_user()
    print("Current user:", user["name"])
