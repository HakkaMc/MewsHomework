import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { searchMoviesApi, getMovieDetailApi } from "../../utils/api";

import { ReduxAction, SearchMoviesApiResponse, SetMovies } from "../../custom";
import { actions, selectors } from "../../reducers";
import {
	SearchMoviesPayload,
	searchMovies as searchMoviesMapper,
	setMovies as setMoviesMapper
} from "./mappers";
import { Movie } from "../../reducers/Movies/model";

export function* searchMovies(action: ReduxAction) {
	const movieName: string = action.payload.movieName;

	if (movieName) {
		yield put(actions.movies.clearSelectedMovie());

		const ajaxId: string = yield new Date().getTime().toString();
		const pageNumber: number = action.payload.pageNumber || 1;

		const payload: SearchMoviesPayload = yield call(
			searchMoviesMapper,
			movieName,
			pageNumber
		);

		yield put(actions.movies.setSearchMoviesAjaxId(ajaxId));
		const response: AxiosResponse<SearchMoviesApiResponse> = yield call(
			searchMoviesApi,
			payload
		);

		const ajaxIdFromState: string = yield select(
			selectors.movies.selectSearchMoviesAjaxId
		);

		if (response.status === 200) {
			if (ajaxId === ajaxIdFromState) {
				const successPayload: SetMovies = yield call(
					setMoviesMapper,
					response.data
				);

				yield put(actions.movies.setMovies(successPayload));
			}
		} else {
			throw new Error(`searchMovies saga - ${JSON.stringify(response)}`);
		}
	} else {
		yield put(actions.movies.clearAll());
	}
}

export function* getMovieDetail(action: ReduxAction) {
	const ajaxId: string = yield new Date().getTime().toString();

	yield put(actions.movies.clearSelectedMovie());
	yield put(actions.movies.setGetMovieDetailAjaxId(ajaxId));

	const movieId: number = action.payload;

	if (movieId) {
		const response: AxiosResponse<Movie> = yield call(
			getMovieDetailApi,
			movieId
		);

		const ajaxIdFromState: string = yield select(
			selectors.movies.selectGetMovieDetailAjaxId
		);

		if (response.status === 200) {
			if (ajaxId === ajaxIdFromState) {
				yield put(actions.movies.setSelectedMovie(response.data));
			}
		} else {
			throw new Error(`getMovieDetail saga - ${JSON.stringify(response)}`);
		}
	} else {
		console.log("Invalid or missing movie ID");
	}
}
