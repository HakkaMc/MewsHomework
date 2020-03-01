import React from "react";
import { shallow } from "enzyme";

import { Detail, Props } from "./Detail";

describe("<Detail/>", () => {
	let props: Props;

	beforeEach(() => {
		props = {
			selectedMovie: undefined
		};
	});

	it("Match snapshot with selectedMovie=undefined", () => {
		props.selectedMovie = undefined;
		const wrapper = shallow(<Detail {...props} />);
		expect(wrapper.isEmptyRender()).toBe(true);
		expect(wrapper).toMatchSnapshot();
	});

	it("Match snapshot with mock selectedMovie", () => {
		props.selectedMovie = {
			id: 0,
			original_language: "en",
			original_title: "title",
			poster_path: "",
			title: "title",
			vote_average: 0,
			vote_count: 0
		};

		const wrapper = shallow(<Detail {...props} />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper).toMatchSnapshot();
	});
});
