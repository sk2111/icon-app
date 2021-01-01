import firebase from 'firebase/app';
//constants
import { USER_PROFILE } from '../utilities/app.constants';

const { USER_FIRST_NAME, USER_LAST_NAME, USER_EMAIL, USER_CREATED_AT, USER_FAVORITES } = USER_PROFILE;

export const createUserProileDocObj = (firstname, lastname, email) => {
    if (firstname && lastname && email) {
        return {
            [USER_FIRST_NAME]: firstname,
            [USER_LAST_NAME]: lastname,
            [USER_EMAIL]: email,
            [USER_CREATED_AT]: firebase.firestore.Timestamp.fromDate(new Date()),
            [USER_FAVORITES]: {},
            // userMessagesDocId: {}
        }
    }
} 