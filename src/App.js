//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import SignOut from './components/sign-out/sign-out.component';
import UpdatePassword from './components/update-password/update-password.component';
import ProtectedRouteHomePage from './pages/home-page/home-page.component';
import ToastMessage from './components/toast-message/toast-message.component';
import RouteNotFound from './components/route-not-found/route-not-found.component';
//actions
import { checkUserPersistanceStart, userPersistanceCheckCompleted } from './redux/user/user.actions';
//Reselect
import { selectCurrentUser, selectUserPersistCheckDone } from './redux/user/user.selectors';
// constants
import { AUTH_PATH, SIGN_OUT_PAGE_PATH, UPDATE_PASSWORD_PAGE_PATH, HOME_PATH } from './utilities/route.paths';
//logos
import { ReactComponent as AnimAppLogo } from './assests/anim-applogo.svg';

const App = ({ currentUser, userPersistCheckDone, checkUserPersistanceStart }) => {

  useEffect(() => {
    checkUserPersistanceStart();
  }, [checkUserPersistanceStart]);

  const renderHelper = () => {
    if (!userPersistCheckDone) return <AnimAppLogo />;
    return (
      <React.Fragment>
        <ToastMessage />
        <Switch>
          <Route exact path={`${AUTH_PATH}${SIGN_OUT_PAGE_PATH}`} component={SignOut}></Route>
          <Route exact path={`${AUTH_PATH}${UPDATE_PASSWORD_PAGE_PATH}`} component={UpdatePassword}></Route>
          <Route path={AUTH_PATH} render={(props) => <SignInAndSignUpPage {...props} currentUser={currentUser} />}></Route>
          <Route path={`${HOME_PATH}`} render={(props) => <ProtectedRouteHomePage {...props} currentUser={currentUser} />}></Route>
          <Route component={RouteNotFound}></Route>
        </Switch>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {renderHelper()}
    </React.Fragment>
  );

};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userPersistCheckDone: selectUserPersistCheckDone
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserPersistanceStart: () => dispatch(checkUserPersistanceStart()),
    userPersistanceCheckCompleted: () => dispatch(userPersistanceCheckCompleted())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);