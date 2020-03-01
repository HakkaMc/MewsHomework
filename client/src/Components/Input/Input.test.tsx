import React from "react";
import { shallow } from "enzyme";

import Input from "./Input";

describe("<Input/>", () => {
	it("Match snapshot", () => {
		const wrapper = shallow(<Input />);
		expect(wrapper).toMatchSnapshot();
	});
});
