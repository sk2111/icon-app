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
import { checkUserPersistance, userPersistanceCheckCompleted } from './redux/user/user.actions';
//Reselect
import { selectCurrentUser, selectUserPersistCheckDone } from './redux/user/user.selectors';
// constants
import { BASE_PATH, HOME_PATH } from './utilities/route.paths';
//logos
import { ReactComponent as AppLogo } from './assests/applogo.svg';

const App = ({ currentUser, userPersistCheckDone, checkUserPersistance }) => {
  useEffect(() => {
    checkUserPersistance();
  }, [checkUserPersistance]);

  const renderHelper = () => {
    if (!userPersistCheckDone) return <AppLogo />;
    return (
      <React.Fragment>
        <ToastMessage />
        <Switch>
          <Route path={BASE_PATH} render={(props) => <SignInAndSignUpPage {...props} currentUser={currentUser} />}></Route>
          <Route path={HOME_PATH} render={(props) => <ProtectedRouteHomePage {...props} currentUser={currentUser} />}></Route>
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
    checkUserPersistance: () => dispatch(checkUserPersistance()),
    userPersistanceCheckCompleted: () => dispatch(userPersistanceCheckCompleted())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);