import { createSelector } from 'reselect';

const selectSignInSignUp = state => state.signInSignUp;

export const selectSignInViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signInViewHidden);

export const selectSignUpViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signUpViewHidden);

export const selectForgotPasswordViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.forgotPasswordViewHidden);

export const selectWaitingForData = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.waitingForData);
