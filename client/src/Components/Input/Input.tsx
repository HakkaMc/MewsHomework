import React from "react";
import {
	Field,
	WrappedFieldProps,
	WrappedFieldInputProps,
	CommonFieldProps
} from "redux-form";
import { TextField, InputBaseProps } from "@material-ui/core";

const Component: React.FC<WrappedFieldInputProps &
	InputBaseProps &
	CommonFieldProps &
	WrappedFieldProps> = (
	props: WrappedFieldInputProps &
		InputBaseProps &
		CommonFieldProps &
		WrappedFieldProps
) => {
	const updatedProps: any = {
		...props,
		...props.input
	};

	delete updatedProps.meta;

	return <TextField {...updatedProps} />;
};

const Input: React.FC<WrappedFieldInputProps &
	InputBaseProps &
	CommonFieldProps &
	any> = props => <Field {...props} component={Component} />;

export default Input;
