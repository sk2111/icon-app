import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
      </Switch>
    )
  }
}


export default App;