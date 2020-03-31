import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header/Header';
//import FormsDemo from './components/FormsDemo/FormsDemo';
import User from './components/User/User';
import UsersList from './components/UsersList/UsersList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Header/>
          <br/>
          <Route path="/" exact component={UsersList}/>
          <Route path="/createUser" component={User}/> 
        </div>
      </Router>
    </div>
  );
}

export default App;
