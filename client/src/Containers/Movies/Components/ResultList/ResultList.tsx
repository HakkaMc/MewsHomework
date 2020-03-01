import React from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { compose } from "recompose";
import get from "lodash/get";

import { Movie } from "../../../../reducers/Movies/model";
import { ReduxState, actions } from "../../../../reducers";

export interface Props {
	clearSelectedMovie: typeof actions.movies.clearSelectedMovie;
	movies: Array<Movie>;
	selectedMovie?: Movie;
	setSelectedMovie: typeof actions.movies.setSelectedMovie;
	getMovieDetail: typeof actions.movies.getMovieDetail;
	searchMovies: typeof actions.movies.searchMovies;
	page: number;
	totalResults: number;
	totalPages: number;
}

export const ResultList: React.FC<Props> = (props: Props) => {
	const getMovieDetail = (movieId: number) => () => {
		props.clearSelectedMovie();
		props.getMovieDetail(movieId);
	};

	const list: Array<any> = (props.movies || []).map((movie: any) => {
		return (
			<ListItem
				button
				key={movie.id}
				selected={movie.id === get(props, "selectedMovie.id")}
				onClick={getMovieDetail(movie.id)}
			>
				<ListItemText primary={movie.title} />
			</ListItem>
		);
	});

	return (
		<List component="nav" style={{ paddingTop: 0 }}>
			{list}
		</List>
	);
};

export default compose<Props, any>(
	connect(
		(state: ReduxState) => ({
			page: state.movies.page,
			totalResults: state.movies.totalResults,
			totalPages: state.movies.totalPages,
			movies: state.movies.movies,
			selectedMovie: state.movies.selectedMovie
		}),
		{
			setSelectedMovie: actions.movies.setSelectedMovie,
			getMovieDetail: actions.movies.getMovieDetail,
			searchMovies: actions.movies.searchMovies,
			clearSelectedMovie: actions.movies.clearSelectedMovie
		}
	)
)(ResultList);
