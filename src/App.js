// src/App.js
// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Director from './Components/Director';

function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Organizational Structure</h1>
      <Director />
    </div>
  );
}

export default App;
