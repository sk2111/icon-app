//libs
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ProtectedRouteHomePage from './pages/home-page/home-page.component';
import ToastMessage from './components/toast-message/toast-message.component';
//actions
import { checkUserPersistance } from './redux/user/user.actions';
//Reselect
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {

  componentDidMount() {
    this.props.checkUserPersistance();
  };

  renderSignInRoute = (compProps) => {
    return (this.props.currentUser?.uid) ?
      <Redirect to="/" /> : <SignInAndSignUpPage {...compProps} />;
  };

  renderProtectedRoute = (props, currentUser, ProtectedComponent) => {
    return <ProtectedComponent {...props} currentUser={currentUser} />;
  };

  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <ToastMessage />
        <Switch>
          <Route exact path='/signin' render={this.renderSignInRoute}></Route>
          <Route exact path='/' render={(props) => this.renderProtectedRoute(props, currentUser, ProtectedRouteHomePage)}></Route>
        </Switch>
      </React.Fragment>
    )
  };

};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserPersistance: () => dispatch(checkUserPersistance())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);