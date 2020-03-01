import { ReduxState } from "../index";
import get from "lodash/get";

export const selectedMovieName = (state: ReduxState): string =>
	get(state, "form.search.values.movieName") || "";

export const selectSearchMoviesAjaxId = (state: ReduxState): string =>
	state.movies.searchMoviesAjaxId;
export const selectGetMovieDetailAjaxId = (state: ReduxState): string =>
	state.movies.getMovieDetailAjaxId;
