import { ReduxAction } from "../custom";

export const action = (payload?: any): ReduxAction => ({
	type: "",
	payload
});

export const processActions = (actions: any, prefix: string): void => {
	Object.keys(actions).forEach((key: string) => {
		const type = `${prefix.toUpperCase()}_${key}`;
		const origFunction: any = actions[key];
		actions[key] = (...rest: Array<any>): ReduxAction => {
			const ret: ReduxAction = {
				...origFunction(...rest),
				type
			};

			return ret;
		};

		actions[key].toString = (): string => type;
	});
};
