//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ProtectedRouteHomePage from './pages/home-page/home-page.component';
import ToastMessage from './components/toast-message/toast-message.component';
import RouteNotFound from './components/route-not-found/route-not-found.component';
//actions
import { checkUserPersistance } from './redux/user/user.actions';
//Reselect
import { selectCurrentUser } from './redux/user/user.selectors';
// constants
import { BASE_PATH, HOME_PATH } from './utilities/route.paths';

const App = ({ currentUser, checkUserPersistance }) => {

  useEffect(() => {
    // checkUserPersistance();
  }, []);

  return (
    <React.Fragment>
      <ToastMessage />
      <Switch>
        <Route path={BASE_PATH} render={(props) => <SignInAndSignUpPage {...props} currentUser={currentUser} />}></Route>
        <Route exact path={HOME_PATH} render={(props) => <ProtectedRouteHomePage {...props} currentUser={currentUser} />}></Route>
        <Route component={RouteNotFound}></Route>
      </Switch>
    </React.Fragment>
  )

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