import React from "react";
import { shallow } from "enzyme";

import { InputBase, Input } from "../index";
import { Search, Props, OuterProps } from "./Search";

describe("<Search/>", () => {
	let props: Props & OuterProps;

	beforeEach(() => {
		props = {
			searchMovies: jest.fn()
		};
	});

	it("Match snapshot width light: false", () => {
		props.light = false;
		const wrapper = shallow(<Search {...props} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(Input)).toHaveLength(1);
		expect(wrapper.find(InputBase)).toHaveLength(0);
	});

	it("Match snapshot width light: true", () => {
		props.light = true;
		const wrapper = shallow(<Search {...props} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(Input)).toHaveLength(0);
		expect(wrapper.find(InputBase)).toHaveLength(1);
	});

	it("Changing input value calls searchMoviesWrapper", () => {
		jest.useFakeTimers();
		props.light = false;
		const wrapper = shallow(<Search {...props} />);
		wrapper.find(Input).prop("onChange")(null, "movie");
		jest.runAllTimers();
		expect(props.searchMovies).toHaveBeenCalledWith("movie");
	});
});
