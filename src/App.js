//libs
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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


const App = ({ currentUser, checkUserPersistance }) => {

  useEffect(() => {
    checkUserPersistance();
  }, []);

  return (
    <React.Fragment>
      <ToastMessage />
      <Switch>
        <Route exact path='/signin' render={(props) => <SignInAndSignUpPage {...props} currentUser={currentUser} />}></Route>
        <Route exact path='/' render={(props) => <ProtectedRouteHomePage {...props} currentUser={currentUser} />}></Route>
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