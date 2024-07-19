import { View, Text, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'

import { Link } from 'react-router-native'

import theme from '../theme'
import { ScrollView } from 'react-native-web'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		height: 60,
		backgroundColor: theme.colors.navBarBackground,

		// ...
	},

	scrollview: {
		flexDirection: 'row',
	},

	title: {
		margin: 10,
		marginTop: 30,
		fontSize: 15,
		color: theme.colors.white,
	},
	// ...
})

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal style={styles.scrollview}>
				<Link to="/">
					<Text style={styles.title}>Repositories</Text>
				</Link>
				<Link to="/signIn">
					<Text style={styles.title}>Sign in</Text>
				</Link>
			</ScrollView>
		</View>
	)
}

export default AppBar
