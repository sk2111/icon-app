//libs
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ToastMessage from './components/toast-message/toast-message.component';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ToastMessage />
        <Switch>
          <Route exact path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </React.Fragment>
    )
  }
}


export default App;