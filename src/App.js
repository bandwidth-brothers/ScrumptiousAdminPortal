import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import Routing from './Routing';
import { setAuthToken } from './Auth/authAxios'

import { useDispatch } from 'react-redux'
import { logIn, logOut } from './redux/actions/ActionsIndex'
import Context from './containers/higher-order-components/Context/Context';

function App() {
  const [initialized, setInitialized] = useState(false)


  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Context />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
