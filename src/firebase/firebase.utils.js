import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//helpers
import { createUserProileDocObj } from './firebase.helpers';
// constants
import {
    FIREBASE_CONFIG, USERS_COLLECTION_PATH, GET_ACCESS_ROLE_PATH,
    CLASSIFICATION_SELECT_OPTIONS_LIST, CLASSIFICATION_SEARCH_KEYWORD_LIST
} from './firebase.constants';

//init
firebase.initializeApp(FIREBASE_CONFIG);

export const firebaseIns = firebase;
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

export const getUserAccessRoleFromFireStore = async (uid) => {
    // If user doc not exists then we dont need to care to send return data
    // Beacuse by defaukt isAdmin State property is kept false in redux store
    const userAccessRoleRef = firestore.doc(GET_ACCESS_ROLE_PATH + uid);
    try {

        const snapshot = await userAccessRoleRef.get();
        if (snapshot.exists) {
            return {
                ...snapshot.data()
            };
        }
    }
    catch (e) {
        console.log("User Access Role Ref fetching failed", e);
    }
};

export const getDocDataFromFireStore = async (dbDocPath) => {
    const dataDocRef = firestore.doc(dbDocPath);
    try {
        const snapshot = await dataDocRef.get();
        if (snapshot.exists) {
            return { ...snapshot.data() };
        }
    }
    catch (e) {
        console.log("Reading from firestore for Ui display data failed", e);
    }
};

export const CreateNewClassfication = async ({ classification, dbDocPath }) => {
    const docRef = firestore.doc(dbDocPath);
    try {
        const latestData = await getDocDataFromFireStore(dbDocPath);
        const classificationOptionsList = latestData[CLASSIFICATION_SELECT_OPTIONS_LIST];
        if (classificationOptionsList) {
            const newClassificationList = [classification, ...classificationOptionsList];
            docRef.update({
                [CLASSIFICATION_SELECT_OPTIONS_LIST]: [...newClassificationList.sort()]
            });
        }
        else {
            await docRef.update({
                [CLASSIFICATION_SELECT_OPTIONS_LIST]: firebase.firestore.FieldValue.arrayUnion(classification)
            });
        }
        return true;
    }
    catch (e) {
        console.log("create new classification failed", e);
    }
};

export const updateDocPropInFirestore = async (dbDocPath, { property, value }) => {
    const docRef = firestore.doc(dbDocPath);
    try {
        const latestData = await getDocDataFromFireStore(dbDocPath);
        const dataToUpdate = latestData[property];
        let finalValueToUpload = Array.isArray(dataToUpdate) ? [...new Set([...dataToUpdate, ...value])] : value;
        await docRef.update({
            [property]: finalValueToUpload
        });
        return true;
    }
    catch (e) {
        console.log("updating doc failed", e);
        throw e;
    }
};