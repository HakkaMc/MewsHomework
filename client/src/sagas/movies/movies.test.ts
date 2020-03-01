import { testSaga } from "redux-saga-test-plan";

import { movieSagas } from "../";
import { ReduxAction } from "../../custom";
import { actions, selectors } from "../../reducers";
import {
	searchMovies as searchMoviesMapper,
	setMovies as setMoviesMapper
} from "./mappers";
import { searchMoviesApi, getMovieDetailApi } from "../../utils/api";
import { Movie } from "../../reducers/Movies/model";

describe("movies sagas", () => {
	let action: ReduxAction;
	let response: any = {};
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
		action = {
			type: "",
			payload: {}
		};

		response = {
			status: 200,
			data: {}
		};
	});

	describe("searchMovies saga", () => {
		it("Empty movie name", () => {
			// @ts-ignore
			testSaga(movieSagas.searchMovies, action)
				.next()
				.put(actions.movies.clearAll())
				.next()
				.isDone();
		});

		it("Valid movie name, valid response", () => {
			action.payload.movieName = "Rambo";
			response.status = 200;
			response.data = {
				movies: [movie],
				page: 1,
				total_pages: 1,
				total_results: 1
			};

			const ajaxId = "ajaxId";

			const payload = searchMoviesMapper(action.payload.movieName, 1);
			const successPayload: any = setMoviesMapper(response.data);

			// @ts-ignore
			testSaga(movieSagas.searchMovies, action)
				.next()
				.put(actions.movies.clearSelectedMovie())
				.next()
				.next(ajaxId)
				.call(searchMoviesMapper, action.payload.movieName, 1)
				.next(payload)
				.put(actions.movies.setSearchMoviesAjaxId(ajaxId))
				.next()
				.call(searchMoviesApi, payload)
				.next(response)
				.select(selectors.movies.selectSearchMoviesAjaxId)
				.next(ajaxId)
				.call(setMoviesMapper, response.data)
				.next(successPayload)
				.put(actions.movies.setMovies(successPayload))
				.next()
				.isDone();
		});

		it("Valid movie name, invalid response", () => {
			action.payload.movieName = "Rambo";
			response.status = 404;

			const ajaxId = "ajaxId";

			const payload = searchMoviesMapper(action.payload.movieName, 1);

			// @ts-ignore
			const sagaResponse = testSaga(movieSagas.searchMovies, action)
				.next()
				.put(actions.movies.clearSelectedMovie())
				.next()
				.next(ajaxId)
				.call(searchMoviesMapper, action.payload.movieName, 1)
				.next(payload)
				.put(actions.movies.setSearchMoviesAjaxId(ajaxId))
				.next()
				.call(searchMoviesApi, payload)
				.next(response)
				.select(selectors.movies.selectSearchMoviesAjaxId);

			expect(() => sagaResponse.next(ajaxId)).toThrow(
				new Error(`searchMovies saga - ${JSON.stringify(response)}`)
			);
		});
	});

	describe("getMovieDetail saga", () => {
		it("Empty movie ID", () => {
			action.payload = undefined;
			const ajaxId = "ajaxId";

			// @ts-ignore
			testSaga(movieSagas.getMovieDetail, action)
				.next()
				.next(ajaxId)
				.put(actions.movies.clearSelectedMovie())
				.next()
				.put(actions.movies.setGetMovieDetailAjaxId(ajaxId))
				.next()
				.isDone();
		});

		it("Valid movie ID, valid response", () => {
			action.payload = 1;
			const ajaxId = "ajaxId";
			response.status = 200;
			response.data = {};

			// @ts-ignore
			testSaga(movieSagas.getMovieDetail, action)
				.next()
				.next(ajaxId)
				.put(actions.movies.clearSelectedMovie())
				.next()
				.put(actions.movies.setGetMovieDetailAjaxId(ajaxId))
				.next()
				.call(getMovieDetailApi, action.payload)
				.next(response)
				.select(selectors.movies.selectGetMovieDetailAjaxId)
				.next(ajaxId)
				.put(actions.movies.setSelectedMovie(response.data))
				.next()
				.isDone();
		});

		it("Valid movie ID, invalid response", () => {
			action.payload = 1;
			const ajaxId = "ajaxId";
			response.status = 404;
			response.data = {};

			// @ts-ignore
			const sagaResponse = testSaga(movieSagas.getMovieDetail, action)
				.next()
				.next(ajaxId)
				.put(actions.movies.clearSelectedMovie())
				.next()
				.put(actions.movies.setGetMovieDetailAjaxId(ajaxId))
				.next()
				.call(getMovieDetailApi, action.payload)
				.next(response)
				.select(selectors.movies.selectGetMovieDetailAjaxId);

			expect(() => sagaResponse.next(ajaxId)).toThrow(
				new Error(`getMovieDetail saga - ${JSON.stringify(response)}`)
			);
		});
	});
});
