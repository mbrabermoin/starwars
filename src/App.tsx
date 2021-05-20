import React from 'react';
import './App.css';
import Lista from './listaPersonajes.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">  
        <p >
          Star Wars Characters.
        </p>     
      </header>
      <Lista></Lista>
    </div>
  );
}

export default App;
