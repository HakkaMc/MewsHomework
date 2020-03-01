import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import { compose } from "recompose";
import {
	FormattedMessage,
	injectIntl,
	WrappedComponentProps as IntlProps
} from "react-intl";
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Container
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import { actions } from "../../reducers";
import Search from "../../Components/Search/Search";
import { messages } from "../../constants/locales/messages";

import styles from "./styles.scss";

export interface Props extends IntlProps {
	change: typeof change;
	clearAll: typeof actions.movies.clearAll;
}

export const Header: React.FC<Props> = (props: Props) => {
	const clearSearch = () => {
		props.change("search", "movieName", "");
		props.clearAll();
	};

	return (
		<AppBar position="static">
			<Container>
				<Toolbar variant="dense" disableGutters>
					<Grid container className={styles.gridContainer}>
						<Grid item>
							<Typography variant="h4">
								<FormattedMessage {...messages.Header.title} />
							</Typography>
						</Grid>
						<Grid item xs={12} sm={5} md={"auto"}>
							<label className={styles.search}>
								<SearchIcon />
								<Search
									light
									placeholder={props.intl.formatMessage(
										messages.Home.placeholder
									)}
								/>
								<ClearIcon className={styles.clearIcon} onClick={clearSearch} />
							</label>
						</Grid>
					</Grid>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default compose<Props, any>(
	injectIntl,
	connect(null, {
		change: change,
		clearAll: actions.movies.clearAll
	})
)(Header);
