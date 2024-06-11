import { createSlice } from "@reduxjs/toolkit"; // Import functions from Redux Toolkit

const searchSlice = createSlice({
	name: "search",
	initialState: {
		history: [],
		favorites: [],
	},
	reducers: {
		addSearch: (state, action) => {
			state.history.push(action.payload);
		},
	},
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
