import { select } from "redux-saga/effects";
import { selectors } from "../../reducers";
import { SearchMoviesApiResponse, SetMovies } from "../../custom";

export interface SearchMoviesPayload {
	query: string;
	page: number;
}

export function* searchMovies(
	movieName: string,
	pageNumber: number
): Generator<any, SearchMoviesPayload, any> {
	const savedMovieName: string = yield select(
		selectors.movies.selectedMovieName
	);

	return {
		query: movieName || savedMovieName,
		page: pageNumber || 1
	};
}

export function* setMovies(
	data: SearchMoviesApiResponse
): Generator<any, SetMovies, any> {
	return {
		movies: data.results,
		page: data.page,
		totalResults: data.total_results,
		totalPages: data.total_pages
	};
}
