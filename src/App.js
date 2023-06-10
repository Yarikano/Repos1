import './App.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { setUser } from './redux/toolkit/slices/users';
import { fetchRooms } from './redux/toolkit/slices/rooms';
import { Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import RoomDetail from './pages/RoomDetail';

import { getCatsFetch } from './redux/toolkit/slices/cats';
// import { usersFetch } from './redux/toolkit/slices/users';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCatsFetch());
	}, [dispatch]);
	useEffect(() => {
		const q = query(collection(db, 'accounts'));
		const unsubcribe = onSnapshot(q, queryCollection => {
			let array = [];
			queryCollection.forEach(doc => {
				array.push({ ...doc.data(), id: doc.id });
			});
			dispatch(setUser(array));
		});
		const queryRooms = query(collection(db, 'Rooms'));
		const unsubscribeRooms = onSnapshot(queryRooms, queryCollection => {
			let array = [];
			queryCollection.forEach(room => {
				array.push({ ...room.data(), id: room.id });
				array.sort((a, b) => {
					return a.number - b.number;
				});
			});
			dispatch(fetchRooms(array));
		});
		return () => {
			unsubcribe();
			unsubscribeRooms();
		};
		// eslint-disable-next-line
	}, []);
	return (
		<div className='App'>
			<AuthContextProvider>
				<Routes>
					<Route path='/' element={<HeaderComponent />}>
						<Route index element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/registration' element={<Register />} />
						<Route path='/account' element={<Account />} />
						<Route path='/room/:id' element={<RoomDetail />} />
					</Route>
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;
