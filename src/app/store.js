import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import { b3k3nApi } from "@/src/services/b3k3n.js";
import storage from "redux-persist/lib/storage";
import bookmarksReducer from "@/src/features/bookmarks/bookmarksSlice.js";

const bookmarksPersistConfig = {
	key: "b3k3n-bookmarks",
	storage,
};

const reducer = {
	[b3k3nApi.reducerPath]: b3k3nApi.reducer,
	bookmarks: persistReducer(bookmarksPersistConfig, bookmarksReducer),
};

export function makeStore() {
	return configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(b3k3nApi.middleware),
	});
}

export const wrapper = createWrapper(makeStore, { debug: false });
