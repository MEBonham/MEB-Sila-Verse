import React, { setGlobal } from 'reactn';
import { Route } from 'react-router-dom';

import Header from './components/auth/Header';
import Sidebar from './components/sidebar/Sidebar';
import CharSheet from './components/main/CharSheet';
import EditHeroForm from './components/main/EditHeroForm';
import NewHeroForm from './components/main/NewHeroForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import firebase from './config/fbConfig';

import './App.css';
import './ContextMenu.css';

function App() {

  // firebase.auth.onAuthStateChanged(user => {
  //   if (user) {
  //     setGlobal({
  //       prevSignedIn: true
  //     });
  //   } else {
  //     setGlobal({
  //       prevSignedIn: false
  //     });
  //   }
  // });

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Sidebar} />
      <Route path="/viewhero" component={Sidebar} />
      <Route path="/viewhero/:id" component={CharSheet} />
      <Route path="/edithero" component={Sidebar} />
      <Route path="/edithero/:id" component={EditHeroForm} />
      <Route path="/newhero" component={Sidebar} />
      <Route path="/newhero" component={NewHeroForm} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
