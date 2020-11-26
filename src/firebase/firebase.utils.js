import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//helpers
import { createUserProileDocObj } from './firebase.helpers';
// constants
import { FIREBASE_CONFIG, USERS_COLLECTION_PATH, GET_ACCESS_ROLE_PATH } from './firebase.constants';

//init
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileInFirestore = async (userData) => {
    const { uid, email, firstname, lastname } = userData;
    const userRef = firestore.collection(USERS_COLLECTION_PATH).doc(uid);
    try {
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            await userRef.set(createUserProileDocObj(firstname, lastname, email));
        }
    }
    catch (e) {
        console.log("Profile update failed", e);
        throw e;
    }
    return userRef;
};

export const readUserProfileFromFireStore = async (uid) => {
    const userRef = firestore.collection(USERS_COLLECTION_PATH).doc(uid);
    try {
        const snapshot = await userRef.get();
        if (snapshot.exists) {
            return {
                uid,
                ...snapshot.data()
            };
        }
        return false;
    }
    catch (e) {
        console.log("Reading profile failed", e);
        throw e;
    }
};

export const getCurrentUser = () => {
    return new Promise((res, rej) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            res(userAuth);
        }, rej)
    })
};

export const getUserAccessRoleFromFireStore = async ({ payload: { uid } }) => {
    // If user doc not exists then we dont need to care to send return data
    // Beacuse by defaukt isAdmin State property is kept false in redux store
    const userAccessRoleRef = firestore.doc(GET_ACCESS_ROLE_PATH + uid);
    const snapshot = await userAccessRoleRef.get();
    if (snapshot.exists) {
        return {
            ...snapshot.data()
        };
    }
};