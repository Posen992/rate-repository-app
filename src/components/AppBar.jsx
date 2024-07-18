import { View, Text, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'

import theme from '../theme'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		height: 60,
		backgroundColor: theme.colors.navBarBackground,

		// ...
	},

	title: {
		paddingLeft: 20,
		paddingTop: 30,
		fontSize: 15,
		color: theme.colors.white,
	},
	// ...
})

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text style={styles.title}>Repositories</Text>
			</Pressable>
		</View>
	)
}

export default AppBar
