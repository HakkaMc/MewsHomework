module.exports = {
	"collectCoverageFrom": [
		"client/src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts"
	],
	"moduleFileExtensions": [
		"web.js",
		"js",
		"web.ts",
		"ts",
		"web.tsx",
		"tsx",
		"json",
		"web.jsx",
		"jsx",
		"node"
	],
	"moduleNameMapper": {
		"^react-native$": "react-native-web",
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
	},
	"modulePaths": [],
	"roots": [
		"<rootDir>/client/src"
	],
	"setupFiles": [
		"react-app-polyfill/jsdom",
		"<rootDir>/enzyme-setup.js"
	],
	"setupFilesAfterEnv": [],
	"testEnvironment": "jest-environment-jsdom-fourteen",
	"testMatch": [
		"<rootDir>/client/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
		"<rootDir>/client/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
	],
	"snapshotSerializers": ["enzyme-to-json/serializer"],
	"transform": {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
		"^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
		"^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
	},
	"transformIgnorePatterns": [
		"[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
		"^.+\\.module\\.(css|sass|scss)$"
	],
	"watchPlugins": [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname"
	]
}