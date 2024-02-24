import React from 'react';
import './App.css';
import BitcoinBlocks from './BitcoinBlocks'; // Import the BitcoinBlocks component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BitcoinBlocks /> {/* Render the BitcoinBlocks component */}
      </header>
    </div>
  );
}

export default App;
