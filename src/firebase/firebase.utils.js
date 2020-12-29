import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//helpers
import { createUserProileDocObj } from './firebase.helpers';
// constants
import {
    FIREBASE_CONFIG, USERS_COLLECTION_PATH, GET_ACCESS_ROLE_PATH,
    CLASSIFICATION_SELECT_OPTIONS_LIST
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
        throw e;
    }
};

export const CreateNewClassfication = async ({ classification, dbDocPath }) => {
    const docRef = firestore.doc(dbDocPath);
    try {
        docRef.update({
            [CLASSIFICATION_SELECT_OPTIONS_LIST]: firebase.firestore.FieldValue.arrayUnion(classification)
        });
        return true;
    }
    catch (e) {
        console.log("create new classification failed", e);
        throw e;
    }
};

export const updateDocPropInFirestore = async (dbDocPath, { property, value }) => {
    const docRef = firestore.doc(dbDocPath);
    try {
        await docRef.update({
            [property]: (Array.isArray(value) ? firebase.firestore.FieldValue.arrayUnion(...value) : value)
        });
        return true;
    }
    catch (e) {
        console.log("updating doc failed", e);
        throw e;
    }
};

export const performUploadIconsInBatchedMode = async (docPath, iconList) => {
    try {
        const batch = firestore.batch();
        iconList.forEach((icon) => {
            const newIconRef = firestore.collection(docPath).doc();
            batch.set(newIconRef, { ...icon });
        });
        await batch.commit();
        return true;
    }
    catch (e) {
        console.log("Batched write Mode failed", e);
        throw e;
    }
};

export const getDocListByPagination = async ({ collectionPath, classificationConfig, searchKeywordConfig,
    orderConfig, listLimit, previousQueryEndDoc }) => {
    try {
        let docList, isMoreDocsAvailable, newEndDocRef, query;
        const searchValueList = searchKeywordConfig[2];
        let classificationRef = firestore.collection(collectionPath).where(...classificationConfig).orderBy(...orderConfig);
        if (searchValueList.length) {
            console.log("Valid search query is executing here", searchValueList);
            query = previousQueryEndDoc ?
                classificationRef.where(...searchKeywordConfig).startAfter(previousQueryEndDoc).limit(listLimit) :
                classificationRef.where(...searchKeywordConfig).limit(listLimit);
        }
        else {
            console.log("Only select value query is is executing here");
            query = previousQueryEndDoc ? classificationRef.startAfter(previousQueryEndDoc).limit(listLimit) :
                classificationRef.limit(listLimit);
        }
        docList = await query.get();
        isMoreDocsAvailable = docList.size === listLimit;
        newEndDocRef = isMoreDocsAvailable ? docList.docs[docList.docs.length - 1] : null;
        console.log("%cdocList testing -----IRONMAN", "color:blue;font-size:18px;", docList.docs, docList.docs.length, isMoreDocsAvailable, newEndDocRef);
        return {
            docList,
            isMoreDocsAvailable,
            newEndDocRef,
        }
    }
    catch (e) {
        console.log("Get doc list from firestore failed", e);
        throw e;
    }
};