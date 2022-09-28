const { default: AbortController } = require("abort-controller");
const { default: fetch, Headers, Request, Response } = require("node-fetch");

Object.assign(globalThis, {
	fetch,
	Headers,
	Request,
	Response,
	AbortController,
});

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { wrapper } from "../src/app/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

import { persistStore } from "redux-persist";

export default function MyApp({ Component, ...rest }) {
	const { store, props } = wrapper.useWrappedStore(rest);
	const persistor = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Toaster />
				<Component {...props.pageProps} />
			</PersistGate>
		</Provider>
	);
}
