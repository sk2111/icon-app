import { createSelector } from 'reselect';

const selectSignInSignUp = state => state.signInSignUp;

export const selectSignInViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signInViewHidden);

export const selectSignUpViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signUpViewHidden);

export const selectUserLoginViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => !signInSignUp.forgotPasswordViewHidden);

export const selectUserLoginErrorMessage = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signInError);

export const selectForgotPasswordViewHidden = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.forgotPasswordViewHidden);

export const selectWaitingForData = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.waitingForData);

export const selectSignUpError = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.signUpError);
