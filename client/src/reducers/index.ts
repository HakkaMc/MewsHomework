import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import moviesReducer, { moviesActions } from "./Movies/Movies";
import * as moviesSelectors from "./Movies/selectors";

export const actions = {
	movies: moviesActions
};

const reducers = combineReducers({
	movies: moviesReducer,
	form: formReducer
});

export const selectors = {
	movies: moviesSelectors
};

export default reducers;

export type ReduxState = ReturnType<typeof reducers>;
