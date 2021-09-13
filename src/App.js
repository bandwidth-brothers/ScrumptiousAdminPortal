import './App.css';
import React from 'react'

import { BrowserRouter } from 'react-router-dom';

import Layout from './containers/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
