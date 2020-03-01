import React from "react";
import { shallow } from "enzyme";

import { App, Props } from "./App";
import Home from "../Home/Home";

describe("<App/>", () => {
	let props: Props;

	beforeEach(() => {
		props = {
			totalResults: 0
		};
	});

	it("Render with totalResults: 0", () => {
		props.totalResults = 0;
		const wrapper = shallow(<App {...props} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(Home)).toHaveLength(1);
	});

	it("Render with totalResults: 1", () => {
		props.totalResults = 1;
		const wrapper = shallow(<App {...props} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(Home)).toHaveLength(0);
	});
});
