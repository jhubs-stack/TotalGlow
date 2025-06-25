import React, { useState, useRef, useEffect } from 'react';

const Mind = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [dailyPrompt, setDailyPrompt] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/daily-prompt')
      .then(response => response.json())
      .then(data => setDailyPrompt(data.prompt))
      .catch(error => console.error('Error fetching daily prompt:', error));
  }, []);

  const handleRecordClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunks.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks.current, { type: 'audio/webm' });
          setAudioURL(URL.createObjectURL(blob));
          uploadAudio(blob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or error: ", err);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      const response = await fetch('http://127.0.0.1:8000/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '700px', margin: '0 auto', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🧘 Mind Pillar - Journal</h1>

      {dailyPrompt && (
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: '#f0f4f8',
          border: '1px solid #d0d7de',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#555' }}>Today's Prompt:</h3>
          <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>{dailyPrompt}</p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={handleRecordClick}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: isRecording ? '#d9534f' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      {audioURL && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Recording Preview:</h3>
          <audio controls src={audioURL} />
        </div>
      )}

      {transcription && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fff8dc',
          border: '1px solid #f5deb3',
          borderRadius: '8px'
        }}>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default Mind;