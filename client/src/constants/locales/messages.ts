// @flow

import get from "lodash/get";
import set from "lodash/set";

export interface Message {
	id: string;
	defaultMessage: string;
}

interface TranslationObject {
	cs: string;
	en: string;
}

// A helper function to simulate the "message" leaf objects return Message type (to be the developer able use
// message object like "message.Home.title.id" and the typescript will not throw syntax error.
const t = (translationObject: TranslationObject): Message => {
	const tmp: any = { ...translationObject };

	return {
		...tmp,
		defaultMessage: translationObject.en
	};
};

const languages: Array<string> = ["en", "cs"];

const dictionary: Record<string, Record<string, string>> = {};

languages.forEach((language: string) => {
	dictionary[language] = {};
});

export const messages = {
	Header: {
		title: t({
			cs: "Databáze filmů",
			en: "Movie database"
		})
	},
	Home: {
		title: t({
			cs: "Najít film",
			en: "Start searching a movie..."
		}),
		placeholder: t({
			cs: "Jméno filmu",
			en: "Movie name..."
		})
	}
};

// Prepare dictionary for react-intl
const enhanceMessages = (path: string) => {
	const actualObject: any = path ? get(messages, path) : messages;
	const keys = Object.keys(actualObject);

	keys.forEach((key: string) => {
		const fullPath: string = path ? `${path}.${key}` : key;

		if (typeof actualObject[key] === "object") {
			if (typeof actualObject[key].defaultMessage === "string") {
				const defaultValue: string = actualObject[key].defaultMessage;

				languages.forEach((language: string) => {
					const value: string = actualObject[key][language];
					dictionary[language][fullPath] = value || defaultValue;
				});

				const messageObject: Message = {
					id: fullPath,
					defaultMessage: defaultValue
				};

				set(messages, fullPath, messageObject);
			} else {
				enhanceMessages(fullPath);
			}
		}
	});
};

enhanceMessages("");

export default dictionary;
