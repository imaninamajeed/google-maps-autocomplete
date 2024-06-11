import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import { thunk } from "redux-thunk"; // Corrected import

const store = configureStore({
	reducer: {
		search: searchReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
