import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def transcribe_audio(file_path):
    """
    Transcribes an audio file to text using OpenAI Whisper.
    Args:
        file_path (str): Path to the audio file (e.g., .mp3, .wav)
    Returns:
        str: Transcribed text
    """
    try:
        with open(file_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
            return transcript.text
    except Exception as e:
        print(f"[ERROR] Transcription failed: {e}")
        return ""