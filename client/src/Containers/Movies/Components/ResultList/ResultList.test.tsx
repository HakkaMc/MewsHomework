import React from "react";
import { shallow } from "enzyme";

import { ResultList, Props } from "./ResultList";
import { ListItem } from "@material-ui/core";

describe("<ResultList/>", () => {
	let props: Props;

	beforeEach(() => {
		props = {
			clearSelectedMovie: jest.fn(),
			movies: [
				{
					id: 0,
					original_language: "en",
					original_title: "title",
					poster_path: "",
					title: "title",
					vote_average: 0,
					vote_count: 0
				}
			],
			selectedMovie: undefined,
			setSelectedMovie: jest.fn(),
			getMovieDetail: jest.fn(),
			searchMovies: jest.fn(),
			page: 1,
			totalResults: 2,
			totalPages: 1
		};
	});

	it("Match snapshot with valid mock data", () => {
		props.totalPages = 0;
		const wrapper = shallow(<ResultList {...props} />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper).toMatchSnapshot();
	});

	it("Selecting an  item calls clearSelectedMovie and getMovieDetail", () => {
		props.totalPages = 0;
		const wrapper = shallow(<ResultList {...props} />);
		// @ts-ignore
		wrapper.find(ListItem).prop("onClick")(props.movies[0].id);
		expect(props.clearSelectedMovie).toHaveBeenCalled();
		expect(props.getMovieDetail).toHaveBeenCalledWith(props.movies[0].id);
	});
});
