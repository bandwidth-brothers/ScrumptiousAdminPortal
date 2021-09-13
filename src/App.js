import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import Layout from './containers/Layout';
import { setAuthToken } from './Auth/authAxios'

function App() {
  const [initialized, setInitialized] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // no token found
      console.log('token NOT FOUND')
      setLoggedIn(false)
    } else {
      setAuthToken(token)
      setLoggedIn(true)
      console.log('token FOUND')
    }

    setInitialized(true)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {initialized ? <Layout isLoggedIn={isLoggedIn} /> : null}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
