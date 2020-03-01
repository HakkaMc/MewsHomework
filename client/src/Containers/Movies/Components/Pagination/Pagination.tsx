import React from "react";
import { connect } from "react-redux";
import PaginationComponent from "@material-ui/lab/Pagination";
import { compose } from "recompose";
import classnames from "classnames";

import { ReduxState, actions } from "../../../../reducers";

export interface Props {
	searchMovies: typeof actions.movies.searchMovies;
	page: number;
	totalPages: number;
	className?: string;
}

export const Pagination: React.FC<Props> = (props: Props) => {
	const changePage = (event: any, pageNumber: number) =>
		props.searchMovies(undefined, pageNumber);

	if (!props.totalPages) return null;

	return (
		<div className={classnames(props.className)}>
			<PaginationComponent
				count={props.totalPages}
				page={props.page}
				onChange={changePage}
			/>
		</div>
	);
};

export default compose<Props, any>(
	connect(
		(state: ReduxState) => ({
			page: state.movies.page,
			totalPages: state.movies.totalPages
		}),
		{
			searchMovies: actions.movies.searchMovies
		}
	)
)(Pagination);
