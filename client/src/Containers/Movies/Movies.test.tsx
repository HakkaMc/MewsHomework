import React from "react";
import { shallow } from "enzyme";

import { Movies } from "./Movies";

describe("<Movies/>", () => {
	it("Match snapshot", () => {
		const wrapper = shallow(<Movies />);
		expect(wrapper).toMatchSnapshot();
	});
});
