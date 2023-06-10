import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	rooms: [],
	numberSort: true,
	typeSort: true,
	occupancySort: true,
	priceSort: true,
	guestSort: true
};

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		fetchRooms(state, action) {
			state.rooms = action.payload;
		},
		sortByNumber(state) {
			if (state.numberSort) {
				state.numberSort = false;
				state.rooms.sort((a, b) => {
					return b.number - a.number;
				});
			} else if (!state.numberSort) {
				state.numberSort = true;
				state.rooms.sort((a, b) => {
					return a.number - b.number;
				});
			}
		},
		sortByType(state) {
			if (state.typeSort) {
				state.typeSort = false;
				state.rooms.sort((a, b) => {
					return b.type.localeCompare(a.type);
				});
			} else if (!state.typeSort) {
				state.typeSort = true;
				state.rooms.sort((a, b) => {
					return a.type.localeCompare(b.type);
				});
			}
		},
		sortByOccupancy(state) {
			if (state.occupancySort) {
				state.occupancySort = false;
				state.rooms.sort((a, b) => {
					return b.occupancy - a.occupancy;
				});
			} else if (!state.occupancySort) {
				state.occupancySort = true;
				state.rooms.sort((a, b) => {
					return a.occupancy - b.occupancy;
				});
			}
		},
		sortByPrice(state) {
			if (state.priceSort) {
				state.priceSort = false;
				state.rooms.sort((a, b) => {
					return b.price - a.price;
				});
			} else if (!state.priceSort) {
				state.priceSort = true;
				state.rooms.sort((a, b) => {
					return a.price - b.price;
				});
			}
		},
		sortByGuest(state) {
			if (state.guestSort) {
				state.guestSort = false;
				state.rooms.sort((a, b) => {
					return b.guest.localeCompare(a.guest);
				});
			} else if (!state.guestSort) {
				state.guestSort = true;
				state.rooms.sort((a, b) => {
					return a.guest.localeCompare(b.guest);
				});
			}
		}
	}
});

export const {
	fetchRooms,
	sortByNumber,
	sortByOccupancy,
	sortByPrice,
	sortByType,
	sortByGuest
} = roomsSlice.actions;

export default roomsSlice.reducer;
