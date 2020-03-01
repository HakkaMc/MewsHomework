module.exports = {
	parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
	parserOptions:{
		project: './tsconfig.json'
	},
	"plugins": [ "@typescript-eslint" ],
	extends:  [
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	settings:  {
		react:  {
			version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
	rules:{
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off'
	}
}