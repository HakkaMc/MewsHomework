import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { IntlProvider } from "react-intl";
import get from "lodash/get";

import App from "./Containers/App/App";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";
import { rootSaga } from "./sagas/sagas";
import messages from "./constants/locales/messages";

import "./index.scss";

// ------------------------------------------
// Catch errors which are not catched by any other mechanism
// ------------------------------------------
window.addEventListener(
	"error",
	event => {
		console.log(event);
		// TODO - call sentry log
		alert("App error");
	},
	false
);

const sagaMiddleware = createSagaMiddleware();
const middlewares: Array<any> = [sagaMiddleware];

const middlewareComposeEnhancerParameters: Array<any> = [
	applyMiddleware(...middlewares)
];

// Redux Devtools
if (
	process.env.NODE_ENV !== "production" &&
	window.__REDUX_DEVTOOLS_EXTENSION__
) {
	middlewareComposeEnhancerParameters.push(
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

export const store = createStore(
	reducers,
	{},
	compose(...middlewareComposeEnhancerParameters)
);

sagaMiddleware.run(rootSaga);

let intlMessages: Record<string, string> = messages.en;
const browserLanguage: string = navigator.language.substr(0, 2);
if (get(messages, browserLanguage)) {
	intlMessages = get(messages, browserLanguage);
}

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider locale={browserLanguage} messages={intlMessages}>
			<App />
		</IntlProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
