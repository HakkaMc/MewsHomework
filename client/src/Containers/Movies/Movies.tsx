import React from "react";
import { Grid } from "@material-ui/core";

import ResultList from "./Components/ResultList/ResultList";
import Detail from "./Components/Detail/Detail";
import Pagination from "./Components/Pagination/Pagination";

export const Movies: React.FC = () => {
	return (
		<>
			<Pagination />
			<Grid container spacing={3} style={{ paddingTop: "10px" }}>
				<Grid item xs={12} sm={6}>
					<ResultList />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Detail />
				</Grid>
			</Grid>
			<Pagination />
		</>
	);
};

export default Movies;
