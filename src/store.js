import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, firebaseReducer,  } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
// Reducers 
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const fbConfig = {
    apiKey: "AIzaSyCOZTbiUOpXPS7zlAElaedr8xVAlqj58ls",
    authDomain: "clientpanel-2438e.firebaseapp.com",
    projectId: "clientpanel-2438e",
    storageBucket: "clientpanel-2438e.appspot.com",
    messagingSenderId: "182579766837",
    appId: "1:182579766837:web:fb0758f25a5d5d225df37c",
    measurementId: "G-C78DJK35J5"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance and firestore
firebase.initializeApp(fbConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
});

// check for settings in local storage
if(localStorage.getItem('settings') == null) {
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }

    // set to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

const store = createStore(rootReducer, initialState, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

export default store;
export {rrfProps};