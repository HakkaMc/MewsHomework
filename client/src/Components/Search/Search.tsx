import React from "react";
import { compose } from "recompose";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { actions } from "../../reducers";
import { InputBase, Input } from "../index";

import styles from "./styles.scss";

export interface OuterProps {
	placeholder?: string;
	light?: boolean;
}

export interface Props extends OuterProps {
	searchMovies: typeof actions.movies.searchMovies;
}

export class Search extends React.Component<Props> {
	searchMoviesTimeoutRef: any;

	searchMoviesWrapper = (event: any, newValue: string) => {
		clearTimeout(this.searchMoviesTimeoutRef);
		this.searchMoviesTimeoutRef = setTimeout(() => {
			this.props.searchMovies(newValue);
		}, 1000);
	};

	render() {
		let inputElement;

		if (this.props.light) {
			inputElement = (
				<InputBase
					name="movieName"
					placeholder={this.props.placeholder || "Search…"}
					classes={{
						root: styles.inputRoot,
						input: styles.inputInput
					}}
					inputProps={{ "aria-label": "search" }}
					onChange={this.searchMoviesWrapper}
				/>
			);
		} else {
			inputElement = (
				<Input
					name="movieName"
					label={this.props.placeholder}
					onChange={this.searchMoviesWrapper}
				/>
			);
		}

		return (
			<form noValidate autoComplete="off" className={styles.form}>
				{inputElement}
			</form>
		);
	}
}

export default compose<Props, OuterProps>(
	reduxForm({
		form: "search",
		destroyOnUnmount: false
	}),
	connect(null, {
		searchMovies: actions.movies.searchMovies
	})
)(Search);
