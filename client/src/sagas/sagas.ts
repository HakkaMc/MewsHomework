import { call, all, takeLatest } from "redux-saga/effects";

import { actions } from "../reducers";
import { movieSagas } from "./";

export function* errorWrap(saga: any, ...params: any) {
	try {
		yield call(saga, ...params);
	} catch (error) {
		console.error(error);
		// TODO - call sentry log
		alert("Saga error");
	}
}

const watch = (action: Record<string, any>, saga: any) =>
	takeLatest(action.toString(), errorWrap, saga);

export function* rootSaga() {
	yield all([
		watch(actions.movies.getMovieDetail, movieSagas.getMovieDetail),
		watch(actions.movies.searchMovies, movieSagas.searchMovies)
	]);
}
