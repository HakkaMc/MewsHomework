import React from "react";
import { shallow } from "enzyme";

import { Home, Props } from "./Home";

describe("<Home/>", () => {
	let props: Props;

	beforeEach(() => {
		const intl: any = {
			formatMessage: jest.fn()
		};

		props = {
			intl
		};
	});

	it("Match snapshot", () => {
		const wrapper = shallow(<Home {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
});
