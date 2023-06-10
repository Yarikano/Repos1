// import { collection, onSnapshot, query } from 'firebase/firestore';
import { call, put, takeEvery } from 'redux-saga/effects';
// import { db } from '../../../firebase';
import { getCatsSuccess } from '../slices/cats';
// import { setUser } from '../slices/users';

function* workGetCatsFetch() {
	const cats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'));
	const formattedCats = yield cats.json();
	const formattedCatsShorted = formattedCats.slice(0, 10);
	yield put(getCatsSuccess(formattedCatsShorted));
}

function* catSaga() {
	yield takeEvery('cats/getCatsFetch', workGetCatsFetch);
}
//--------------------------------------------------------

// function getUsers() {
// 	const q = query(collection(db, 'accounts'));
// 	let data = [];
// 	const unsubcribe = onSnapshot(q, queryCollection => {
// 		let array = [];
// 		queryCollection.forEach(doc => {
// 			array.push({ ...doc.data(), id: doc.id });
// 		});
// 		return data.push(array);
// 	});
// 	return data;
// }
// function* workGetUsersFetch() {
// 	const data = yield call(getUsers);
// 	// yield console.log(data);
// 	// yield put(setUser(data));
// // }
// function* userSaga() {
// 	yield takeEvery('users/usersFetch', workGetUsersFetch);
// }

export default catSaga;
