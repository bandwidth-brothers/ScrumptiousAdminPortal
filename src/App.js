import './App.css';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
//import Routing from './Routing';

//import { useDispatch } from 'react-redux'
//import { logIn, logOut } from './redux/actions/ActionsIndex'
import Context from './containers/higher-order-components/Context/Context';

function App() {


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
