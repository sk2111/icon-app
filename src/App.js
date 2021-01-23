//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//css
import styles from './App.module.css';
//component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import SignOut from './components/containers/sign-out/sign-out.component';
import ProtectedUpdatePassword from './components/containers/update-password/update-password.component';
import ProtectedRouteHomePage from './pages/home-page/home-page.component';
import ToastMessage from './components/reusables/toast-message/toast-message.component';
import Modal from './components/reusables/modal/modal.component';
import EditIconContainer from './components/edit-icon/edit-icon-container/edit-icon-container.component';
import RouteNotFound from './components/containers/route-not-found/route-not-found.component';
//actions
import { checkUserPersistanceStart } from './redux/user/user.actions';
//Reselect
import { selectCurrentUser, selectUserPersistCheckDone } from './redux/user/user.selectors';
import { selectIsEditIconModalOpen } from './redux/edit-icon/edit-icon.selectors';
// constants
import { SIGN_OUT_ROUTE_PATH, UPDATE_PASSWORD_ROUTE_PATH, AUTH_ROUTE_PATH, HOME_ROUTE_PATH } from './utilities/route.paths';
//logos
import { ReactComponent as AnimAppLogo } from './assests/anim-applogo.svg';

const App = ({ isEditIconModalOpen, currentUser, userPersistCheckDone, checkUserPersistanceStart }) => {

  useEffect(() => {
    checkUserPersistanceStart();
  }, [checkUserPersistanceStart]);

  //until persistance check done show loading logo to avoid UI flicker
  if (!userPersistCheckDone) return <AnimAppLogo />;

  return (
    <React.Fragment>
      <ToastMessage />
      <Modal contentContainerClass={styles.editIconContainer} isModalOpen={isEditIconModalOpen}>
        <EditIconContainer />
      </Modal>
      <Switch>
        <Route exact path={SIGN_OUT_ROUTE_PATH} render={(routeProps) => <SignOut {...routeProps} />} />
        <Route exact path={UPDATE_PASSWORD_ROUTE_PATH} render={(routeProps) => <ProtectedUpdatePassword {...routeProps} currentUser={currentUser} />} />
        <Route path={AUTH_ROUTE_PATH} render={(routeProps) => <SignInAndSignUpPage {...routeProps} currentUser={currentUser} />} />
        <Route path={HOME_ROUTE_PATH} render={(routeProps) => <ProtectedRouteHomePage {...routeProps} currentUser={currentUser} />} />
        <Route render={(routeProps) => <RouteNotFound {...routeProps} />} />
      </Switch>
    </React.Fragment>
  );

};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isEditIconModalOpen: selectIsEditIconModalOpen,
  userPersistCheckDone: selectUserPersistCheckDone
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkUserPersistanceStart: () => dispatch(checkUserPersistanceStart())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);