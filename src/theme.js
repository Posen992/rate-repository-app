import { Platform } from 'react-native'

const theme = {
	fontFamily: {
		system: Platform.select({
			ios: 'Arial',
			android: 'Roboto',
			default: 'System',
		}),
	},
	colors: {
		navBarBackground: '#24292e',
		primaryBackgroundColor: '#E1E5E7',
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		placeHolder: '#A9A9A9',

		lightgray: '#d3d3d3',
		darkgray: '#616161',
		tagBlue: '#0663D8',
		errorRed: '#d73a4a',

		white: '#fff',
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: 'System',
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
}

export default theme
