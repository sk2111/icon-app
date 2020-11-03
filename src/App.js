//libs
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/home-page/home-page.component';
import ToastMessage from './components/toast-message/toast-message.component';
import ProtectedRoute from './components/protected-route/protected-route.component';
//Reselect
import { selectCurrentUser } from './redux/user/user.selectors';

const ProtectedRouteHomePage = ProtectedRoute(HomePage);
// protected routes 
class App extends React.Component {

  renderSignInRoute = (otherProps) => {
    return (this.props.currentUser?.uid) ? <Redirect to="/" /> : <SignInAndSignUpPage {...otherProps} />;
  }

  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <ToastMessage />
        <Switch>
          <Route
            exact
            path='/signin'
            render={this.renderSignInRoute}
          >
          </Route>
          <Route
            exact
            path='/'
            render={(props) => <ProtectedRouteHomePage {...props} currentUser={currentUser} />}>
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);