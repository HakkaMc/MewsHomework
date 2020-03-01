import React from "react";
import { shallow } from "enzyme";
import ClearIcon from "@material-ui/icons/Clear";

import { Header, Props } from "./Header";

describe("<Header/>", () => {
	let props: Props;

	beforeEach(() => {
		const intl: any = {
			formatMessage: jest.fn()
		};

		props = {
			change: jest.fn(),
			clearAll: jest.fn(),
			intl
		};
	});

	it("Match snapshot", () => {
		const wrapper = shallow(<Header {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("Clear icon click calls props.change and props.clearAll functions", () => {
		const wrapper = shallow(<Header {...props} />);
		wrapper.find(ClearIcon).simulate("click");
		expect(props.change).toHaveBeenCalled();
		expect(props.clearAll).toHaveBeenCalled();
	});
});
