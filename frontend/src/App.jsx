import React, { useState } from 'react';
import Mind from './pages/Mind';
import JournalHistory from './pages/JournalHistory';

function App() {
  const [currentPage, setCurrentPage] = useState('Mind');

  const renderPage = () => {
    if (currentPage === 'Mind') return <Mind />;
    if (currentPage === 'Journal') return <JournalHistory />;
  };

  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <button onClick={() => setCurrentPage('Mind')}>Mind</button>
        <button onClick={() => setCurrentPage('Journal')}>Journal History</button>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;