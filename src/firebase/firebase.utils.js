import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAabx8f6c4lBbHuUoaffVwHwhd3Neo4ihg",
    authDomain: "soliton-icon-app.firebaseapp.com",
    databaseURL: "https://soliton-icon-app.firebaseio.com",
    projectId: "soliton-icon-app",
    storageBucket: "soliton-icon-app.appspot.com",
    messagingSenderId: "149047831841",
    appId: "1:149047831841:web:cf97d944d12e5253a66260",
    measurementId: "G-R49FP8QLF3"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileInFirestore = async (userData) => {
    const { uid, email, name } = userData;
    console.log(uid);
    const userRef = firestore.collection('users').doc(uid);
    try {
        const snapshot = await userRef.get();
        console.log(snapshot);
        if (!snapshot.exists) {
            const userDocToWrite = {
                name,
                email,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                favouriteIconsDocId: {},
                userMessageDocId: {}
            }
            await userRef.set(userDocToWrite);
        }
    }
    catch (e) {
        console.log("Profile update failed", e);
    }
    return userRef;
}