import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/auth/Header';
import Sidebar from './components/sidebar/Sidebar';
import CharSheet from './components/main/CharSheet';
import Login from './components/auth/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Sidebar} />
      <Route path="/viewhero" component={Sidebar} />
      <Route path="/viewhero" component={CharSheet} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
