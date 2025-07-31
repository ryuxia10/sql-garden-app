import React, { useState } from 'react';
import './QueryTerminal.css';

// Terima prop baru: placeholderQuery, dan berikan nilai default
function QueryTerminal({ onRunQuery, placeholderQuery = "Tulis mantra SQL Anda di sini..." }) {
  const [query, setQuery] = useState('');

  const handleRunClick = () => {
    onRunQuery(query);
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-button red"></div>
        <div className="terminal-button yellow"></div>
        <div className="terminal-button green"></div>
        <span>Taman Query</span>
      </div>
      <textarea
        className="terminal-input"
        placeholder={placeholderQuery} // Gunakan prop di sini
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="terminal-run-button" onClick={handleRunClick}>
        Tumbuhkan!
      </button>
    </div>
  );
}

export default QueryTerminal;