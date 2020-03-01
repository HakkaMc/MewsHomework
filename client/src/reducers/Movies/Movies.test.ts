import reducer, { moviesActions } from "./Movies";
import initialState, { Movies, Movie } from "./model";
import { SetMovies } from "../../custom";

describe("reducer Movies", () => {
	let localInitialState: Movies;

	const movie: Movie = {
		id: 0,
		original_language: "en",
		original_title: "Rambo",
		poster_path: "",
		title: "Rambo",
		vote_average: 0,
		vote_count: 0
	};

	beforeEach(() => {
		localInitialState = JSON.parse(JSON.stringify(initialState));
	});

	it("Returns the initial state", () => {
		const state = reducer(localInitialState, { type: "" });
		expect(state).toEqual(localInitialState);
	});

	it("clearAll", () => {
		localInitialState.getMovieDetailAjaxId = "123456789";
		const state: Movies = reducer(localInitialState, moviesActions.clearAll());

		expect(state).toEqual(initialState);
	});

	it("clearSelectedMovie", () => {
		localInitialState.selectedMovie = { ...movie };

		const state: Movies = reducer(
			localInitialState,
			moviesActions.clearSelectedMovie()
		);

		expect(state.selectedMovie).toEqual(undefined);
	});

	it("setMovies", () => {
		const movies: SetMovies = {
			movies: [movie],
			page: 1,
			totalPages: 1,
			totalResults: 1
		};
		const state: Movies = reducer(
			localInitialState,
			moviesActions.setMovies(movies)
		);

		expect(state.movies?.length).toEqual(movies.movies.length);
	});

	it("setSelectedMovie action", () => {
		const state: Movies = reducer(
			localInitialState,
			moviesActions.setSelectedMovie(movie)
		);

		expect(state.selectedMovie).toEqual(movie);
	});

	it("setSearchMoviesAjaxId", () => {
		const id = "123456789";

		const state: Movies = reducer(
			localInitialState,
			moviesActions.setSearchMoviesAjaxId(id)
		);

		expect(state.searchMoviesAjaxId).toEqual(id);
	});

	it("setGetMovieDetailAjaxId", () => {
		const id = "123456789";

		const state: Movies = reducer(
			localInitialState,
			moviesActions.setGetMovieDetailAjaxId(id)
		);

		expect(state.getMovieDetailAjaxId).toEqual(id);
	});
});
