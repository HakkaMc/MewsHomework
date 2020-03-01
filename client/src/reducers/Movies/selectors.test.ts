import {
	selectedMovieName,
	selectGetMovieDetailAjaxId,
	selectSearchMoviesAjaxId
} from "./selectors";

const mockState: any = {
	movies: {
		searchMoviesAjaxId: "123456789",
		getMovieDetailAjaxId: "987654321"
	},
	form: {
		search: {
			values: {
				movieName: "Rambo"
			}
		}
	}
};

describe("reducers/Movies/selectors", () => {
	it("selectedMovieName", () => {
		expect(selectedMovieName(mockState)).toEqual(
			mockState.form.search.values.movieName
		);
	});

	it("selectGetMovieDetailAjaxId", () => {
		expect(selectGetMovieDetailAjaxId(mockState)).toEqual(
			mockState.movies.getMovieDetailAjaxId
		);
	});

	it("selectSearchMoviesAjaxId", () => {
		expect(selectSearchMoviesAjaxId(mockState)).toEqual(
			mockState.movies.searchMoviesAjaxId
		);
	});
});
