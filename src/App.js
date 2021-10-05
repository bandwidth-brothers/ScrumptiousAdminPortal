import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import Routing from './Routing';
import { setAuthToken } from './Auth/authAxios'

import { useDispatch } from 'react-redux'
import { logIn, logOut } from './redux/actions/ActionsIndex'

function App() {
  const [initialized, setInitialized] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // no token found
      dispatch(logOut())
      console.log('token NOT FOUND')
    } else {
      setAuthToken(token)
      dispatch(logIn())
      console.log('token FOUND')
    }

    setInitialized(true)
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {initialized ? <Routing /> : null}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
