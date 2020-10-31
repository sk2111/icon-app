import { createSelector } from 'reselect';

const selectSignInSignUp = state => state.signInSignUp;

export const selectSignInViewHidden = createSelector([selectSignInSignUp], (signInSignUp) => {
    return signInSignUp.signInViewHidden
});

export const selectSignUpViewHidden = createSelector([selectSignInSignUp], (signInSignUp) => {
    return signInSignUp.signUpViewHidden
});