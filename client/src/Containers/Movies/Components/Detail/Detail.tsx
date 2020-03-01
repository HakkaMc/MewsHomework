import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";

import { POSTER_URL } from "../../../../constants";
import { ReduxState } from "../../../../reducers";
import { Movie } from "../../../../reducers/Movies/model";
import styles from "./styles.scss";

export interface Props {
	selectedMovie?: Movie;
}

export const Detail: React.FC<Props> = ({ selectedMovie }: Props) => {
	if (!selectedMovie) return null;

	const imgUrl = `${POSTER_URL}${selectedMovie.poster_path}`;

	return (
		<Grid container spacing={2} className={styles.detail}>
			<Grid item className={styles.posterContainer} xs={12} md={6}>
				<img src={imgUrl} alt="No preview" className={styles.poster} />
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography variant="h6">{selectedMovie.title}</Typography>
				<Typography variant="subtitle1">
					{selectedMovie.original_language}: {selectedMovie.original_title}
				</Typography>
				<Typography variant="subtitle1" noWrap>
					Average vote: {selectedMovie.vote_average} ({selectedMovie.vote_count}{" "}
					votes)
				</Typography>
			</Grid>
		</Grid>
	);
};

export default compose<Props, any>(
	connect(
		(state: ReduxState) => ({
			selectedMovie: state.movies.selectedMovie
		}),
		null
	)
)(Detail);
