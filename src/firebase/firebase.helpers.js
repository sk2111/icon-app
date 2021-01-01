import firebase from 'firebase/app';


export const createUserProileDocObj = (firstname, lastname, email) => {
    if (firstname && lastname && email) {
        return {
            firstName: firstname,
            lastName: lastname,
            email,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            favoriteIconsDocId: {},
            // userMessagesDocId: {}
        }
    }
} 