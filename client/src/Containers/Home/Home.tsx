import React from "react";
import { Typography } from "@material-ui/core";
import {
	FormattedMessage,
	injectIntl,
	WrappedComponentProps as IntlProps
} from "react-intl";
import { compose } from "recompose";

import { Search } from "../../Components";
import { messages } from "../../constants/locales/messages";

export type Props = IntlProps;

export const Home: React.FC<Props> = (props: Props) => {
	return (
		<>
			<Typography variant="h6">
				<FormattedMessage {...messages.Home.title} />
			</Typography>
			<Search
				placeholder={props.intl.formatMessage(messages.Home.placeholder)}
			/>
		</>
	);
};

export default compose<Props, any>(injectIntl)(Home);
