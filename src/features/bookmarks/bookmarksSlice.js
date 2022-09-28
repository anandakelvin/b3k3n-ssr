import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: [],
};

export const bookmarksSlice = createSlice({
	initialState,
	name: "bookmarks",
	reducers: {
		addOrRemove(state, action) {
			const bookIdx = state.value.findIndex((e) => e.id === action.payload.id);
			if (bookIdx != -1) {
				state.value = state.value.filter((e, n) => n !== bookIdx);
			} else {
				state.value.push(action.payload);
			}
		},
	},
});

export const { addOrRemove } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
