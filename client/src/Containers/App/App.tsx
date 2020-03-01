import React from "react";
import { Container, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "recompose";

import { ReduxState } from "../../reducers";
import Header from "../Header/Header";
import Home from "../Home/Home";

import styles from "./styles.scss";

// Example of component lazy loading
const Movies = React.lazy(() => import("../Movies/Movies"));

export interface Props {
	totalResults: number;
}

export const App: React.FC<Props> = (props: Props) => (
	<div className={styles.app}>
		<Header />

		<Container className={styles.container}>
			<Paper elevation={3} className={styles.paper}>
				<React.Suspense fallback={<div>Loading...</div>}>
					{!props.totalResults && <Home />}
					{!!props.totalResults && <Movies />}
				</React.Suspense>
			</Paper>
		</Container>
	</div>
);

export default compose<Props, any>(
	connect(
		(state: ReduxState) => ({
			totalResults: state.movies.totalResults
		}),
		null
	)
)(App);
