import produce, { Draft } from "immer";
import initialState, { Movies, Movie } from "./model";
import { ReduxAction, SetMovies } from "../../custom";
import { action, processActions } from "../../utils/redux";

export const moviesActions = {
	clearAll: () => action(),
	clearSelectedMovie: () => action(),
	getMovieDetail: (movieId: number) => action(movieId),
	searchMovies: (movieName?: string, pageNumber?: number) =>
		action({ movieName, pageNumber }),
	setMovies: (movies: SetMovies) => action(movies),
	setSelectedMovie: (movie: Movie) => action(movie),
	setSearchMoviesAjaxId: (ajaxId: string) => action(ajaxId),
	setGetMovieDetailAjaxId: (ajaxId: string) => action(ajaxId)
};

processActions(moviesActions, "MOVIES");

export default produce<any, any, Movies>(
	(state: Draft<Movies>, action: ReduxAction): Draft<Movies> => {
		switch (action.type) {
			case moviesActions.clearAll.toString(): {
				state = { ...initialState };
				break;
			}

			case moviesActions.clearSelectedMovie.toString(): {
				state.selectedMovie = undefined;
				break;
			}

			case moviesActions.setMovies.toString(): {
				const payload: SetMovies = action.payload;
				state.movies = payload.movies;
				state.page = payload.page;
				state.totalPages = payload.totalPages;
				state.totalResults = payload.totalResults;
				break;
			}

			case moviesActions.setSelectedMovie.toString(): {
				const payload: Movie = action.payload;
				state.selectedMovie = payload;
				break;
			}

			case moviesActions.setSearchMoviesAjaxId.toString(): {
				state.searchMoviesAjaxId = action.payload;
				break;
			}

			case moviesActions.setGetMovieDetailAjaxId.toString(): {
				state.getMovieDetailAjaxId = action.payload;
				break;
			}

			default:
		}

		return state;
	},
	initialState
);
