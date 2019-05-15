import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/auth/Header';
import Sidebar from './components/sidebar/Sidebar';
import CharSheet from './components/main/CharSheet';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Sidebar} />
        <Route path="/viewhero" component={Sidebar} />
        <Route path="/viewhero" component={CharSheet} />
      </div>
    </BrowserRouter>
  );
}

export default App;
