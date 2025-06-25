import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const JournalHistory = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/journal-entries')
      .then(response => response.json())
      .then(data => {
        const sorted = data.entries.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setEntries(sorted);
      })
      .catch(error => console.error('Error fetching journal entries:', error));
  }, []);

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return 'green';
    if (sentiment === 'negative') return 'red';
    if (sentiment === 'neutral') return 'gray';
    return 'black';
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const summary = entries.reduce(
    (acc, entry) => {
      if (entry.sentiment) {
        acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
      }
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const chartData = {
    labels: entries.map(entry => formatTimestamp(entry.timestamp)),
    datasets: [
      {
        label: 'Polarity',
        data: entries.map(entry => entry.polarity),
        fill: false,
        borderColor: '#007bff',
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📊 Journal History</h1>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        borderRadius: '8px',
        backgroundColor: '#f0f4f8',
        border: '1px solid #d0d7de',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Mood Summary:</h2>
        <p style={{ color: 'green' }}>Positive: {summary.positive}</p>
        <p style={{ color: 'red' }}>Negative: {summary.negative}</p>
        <p style={{ color: 'gray' }}>Neutral: {summary.neutral}</p>
      </div>

      <div style={{
        marginBottom: '3rem',
        padding: '1.5rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Mood Over Time:</h2>
        {entries.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>No data available for chart.</p>
        )}
      </div>

      {entries.length === 0 ? (
        <p>No journal entries yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {entries.map((entry, index) => (
            <li key={index} style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#fafafa',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <p><strong>Timestamp:</strong> {formatTimestamp(entry.timestamp)}</p>
              <p><strong>Content:</strong> {entry.content}</p>
              {entry.sentiment && (
                <>
                  <p>
                    <strong>Sentiment:</strong>{' '}
                    <span style={{ color: getSentimentColor(entry.sentiment) }}>
                      {entry.sentiment}
                    </span>
                  </p>
                  <p><strong>Polarity:</strong> {entry.polarity}</p>
                </>
              )}
              {entry.reflection && (
                <p><strong>AI Reflection:</strong> <em>{entry.reflection}</em></p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JournalHistory;