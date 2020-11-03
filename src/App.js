//libs
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ToastMessage from './components/toast-message/toast-message.component';
//Reselect
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  render() {
    console.log("I am App component", this.props);
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);