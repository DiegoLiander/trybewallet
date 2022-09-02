import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ wallet } />
      <Route path="*" component={ Login } />
    </Switch>
  );
}

export default App;
