import React from "react";
import { shallow } from "enzyme";
import PaginationComponent from "@material-ui/lab/Pagination";

import { Pagination, Props } from "./Pagination";

describe("<Pagination/>", () => {
	let props: Props;

	beforeEach(() => {
		props = {
			page: 1,
			searchMovies: jest.fn(),
			totalPages: 1
		};
	});

	it("Match snapshot with totalPages=0", () => {
		props.totalPages = 0;
		const wrapper = shallow(<Pagination {...props} />);
		expect(wrapper.isEmptyRender()).toBe(true);
		expect(wrapper).toMatchSnapshot();
	});

	it("Match snapshot with totalPages=1", () => {
		props.totalPages = 1;
		const wrapper = shallow(<Pagination {...props} />);
		expect(wrapper.isEmptyRender()).toBe(false);
		expect(wrapper).toMatchSnapshot();
	});

	it("Click PaginationComponent calls searchMovies function", () => {
		props.totalPages = 1;
		const wrapper = shallow(<Pagination {...props} />);
		// @ts-ignore
		wrapper.find(PaginationComponent).prop("onChange")(null, 1);
		expect(props.searchMovies).toHaveBeenCalled();
	});
});
