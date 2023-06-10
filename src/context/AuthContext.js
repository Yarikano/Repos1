import { createContext, useContext } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [userUid, setUserUid] = useState('');
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				const uid = currentUser.uid;
				setUserUid(uid);
			} else {
			}
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	// onAuthStateChanged(auth, u => {
	// 	if (u) {
	// 		const uid = u.uid;
	// 		return uid;
	// 	}
	// });

	return (
		<UserContext.Provider value={{ createUser, user, userUid, logout, signIn }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
