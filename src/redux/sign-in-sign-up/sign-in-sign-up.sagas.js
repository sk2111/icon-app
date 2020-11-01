//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
//firebase
import { auth, createUserProfileInFirestore } from '../../firebase/firebase.utils';
//actions types
import { signInSignUpActionTypes } from './sign-in-sign-up.type';



export function* signUpUser({ payload: { email, password, name } }) {
    try {
        const authData = yield auth.createUserWithEmailAndPassword(email, password);
        const { additionalUserInfo, user } = authData;
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield user.sendEmailVerification()

            // TODO :  and show a toast message like verify mail address and sign in

            //TODO: Create a user document in fireStore 
            createUserProfileInFirestore({ uid, email, name })
        }
        console.log(authData, additionalUserInfo, user);
    }
    catch (e) {
        console.log(e);
        // TODO: Capture e. message and display in toast
    }
}


export function* onUserSignUpStart() {
    yield takeLatest(signInSignUpActionTypes.SIGN_UP_START, signUpUser)
}

export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart)
    ])
}