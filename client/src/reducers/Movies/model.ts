export interface Movie {
	id: number;
	original_language: string;
	original_title: string;
	poster_path: string;
	title: string;
	vote_average: number;
	vote_count: number;
}

export interface Movies {
	movies?: Array<Movie>;
	page: number;
	selectedMovie?: Movie;
	totalResults: number;
	totalPages: number;
	searchMoviesAjaxId: string;
	getMovieDetailAjaxId: string;
}

const initialState: Movies = {
	movies: undefined,
	page: 0,
	selectedMovie: undefined,
	totalResults: 0,
	totalPages: 0,
	searchMoviesAjaxId: "",
	getMovieDetailAjaxId: ""
};

export default initialState;
