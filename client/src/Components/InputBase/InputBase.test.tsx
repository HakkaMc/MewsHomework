import React from "react";
import { shallow } from "enzyme";

import InputBase from "./InputBase";

describe("<InputBase/>", () => {
	it("Match snapshot", () => {
		const wrapper = shallow(<InputBase />);
		expect(wrapper).toMatchSnapshot();
	});
});
