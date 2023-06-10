// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC_uvQpR-Y7F_zJGbBCTWsGVAX7u6Jpzmk',
	authDomain: 'hotelcustomerrelationship.firebaseapp.com',
	projectId: 'hotelcustomerrelationship',
	storageBucket: 'hotelcustomerrelationship.appspot.com',
	messagingSenderId: '1099013332608',
	appId: '1:1099013332608:web:a9c1cd15267047cb1d9065'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
