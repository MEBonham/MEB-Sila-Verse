import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/auth/Header';
import Sidebar from './components/sidebar/Sidebar';
import CharSheet from './components/main/CharSheet';
import NewHeroForm from './components/main/NewHeroForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Sidebar} />
      <Route path="/viewhero" component={Sidebar} />
      <Route path="/viewhero" component={CharSheet} />
      <Route path="/newhero" component={Sidebar} />
      <Route path="/newhero" component={NewHeroForm} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
