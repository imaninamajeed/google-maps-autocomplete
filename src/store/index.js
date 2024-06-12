import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import { thunk } from "redux-thunk"; // Importing the thunk middleware

const store = configureStore({
	reducer: {
		search: searchReducer,
	},
	// Adding thunk middleware to the middleware chain
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
