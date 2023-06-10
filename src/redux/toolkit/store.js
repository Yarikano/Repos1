// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import users from './slices/users';
// import rooms from './slices/rooms';
// import createSagaMiddlware from 'redux-saga';
// import cats from './slices/cats';
// import catSaga from './saga/userSaga';

// const sagaMiddleware = createSagaMiddlware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// const store = configureStore({
// 	reducer: {
// 		users,
// 		rooms,
// 		cats
// 	},
// 	middleware
// });
// sagaMiddleware.run(catSaga);

// export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import users from './slices/users';
import rooms from './slices/rooms';
import createSagaMiddlware from 'redux-saga';
import cats from './slices/cats';
import catSaga from './saga/userSaga';
// import userSaga from './saga/userSaga';

const sagaMiddleware = createSagaMiddlware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
	reducer: {
		users,
		rooms,
		cats
	},
	middleware
});
sagaMiddleware.run(catSaga);

export default store;
