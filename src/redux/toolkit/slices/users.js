import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
	currentUser: {}
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersFetch(state) {
			state.users = [];
		},
		setUser(state, action) {
			state.users = action.payload;
		},
		setCurrentUser(state, action) {
			state.currentUser = action.payload;
		}
	}
});

export const { setUser, usersFetch, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
