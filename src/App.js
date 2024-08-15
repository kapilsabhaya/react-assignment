// src/App.js
// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Director from './Components/Director';
import OrgChart from './Components/OrgChart';

function App() {
  return (
    <div className="py-5">
      <h1 className="text-center mb-5">Organizational Structure</h1>
      {/* <Director /> */}
      <OrgChart />
    </div>
  );
}

export default App;
