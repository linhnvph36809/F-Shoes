// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBWy3-3x2Eiid35Ufe8KDcHcvd6DSQAb4E',
    authDomain: 'authorization-c740e.firebaseapp.com',
    databaseURL: 'https://authorization-c740e-default-rtdb.firebaseio.com',
    projectId: 'authorization-c740e',
    storageBucket: 'authorization-c740e.appspot.com',
    messagingSenderId: '336538265177',
    appId: '1:336538265177:web:4711816fc38bea75f83348',
    measurementId: 'G-L2TGC0GP94',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
