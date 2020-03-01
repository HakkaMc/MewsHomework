import { Movie } from "./reducers/Movies/model";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION__: () => any;
	}
}

export interface ReduxAction<T = any> {
	type: string;
	payload?: T;
	toString?: () => string;
}

export interface SetMovies {
	movies: Array<Movie>;
	page: number;
	totalResults: number;
	totalPages: number;
}

export interface SearchMoviesApiResponse {
	page: number;
	results: Array<Movie>;
	total_results: number;
	total_pages: number;
}
