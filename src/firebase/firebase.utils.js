import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAu9ZJCJFg3Rlzs7qIxCd_7jDCZ3vkDeX4",
    authDomain: "solitoniconrepo.firebaseapp.com",
    databaseURL: "https://solitoniconrepo.firebaseio.com",
    projectId: "solitoniconrepo",
    storageBucket: "solitoniconrepo.appspot.com",
    messagingSenderId: "1057477667759",
    appId: "1:1057477667759:web:8b05db60c4b7609fb49d5a",
    measurementId: "G-HEHLN20L8P"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileInFirestore = async (userData) => {
    const { uid, email, name } = userData;
    const userRef = firestore.collection('users').doc(uid);
    try {
        const snapshot = await userRef.get();
        if (!snapshot.exists) {
            const userDocToWrite = {
                name,
                email,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                favouriteIconsDocId: {},
                userMessagesDocId: {}
            }
            await userRef.set(userDocToWrite);
        }
    }
    catch (e) {
        console.log("Profile update failed", e);
    }
    return userRef;
};

export const readUserProfileFromFireStore = async (uid) => {
    const userRef = firestore.collection('users').doc(uid);
    try {
        const snapshot = await userRef.get();
        if (snapshot.exists) {
            return {
                uid,
                ...snapshot.data()
            };
        }
        console.log("User profile didnt created successfully");
    }
    catch (e) {
        console.log("User login failed", e);
        throw e;
    }
};