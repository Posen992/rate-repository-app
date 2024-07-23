import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import Constants from 'expo-constants'
import { useApolloClient } from '@apollo/client'

import theme from '../theme'

import useAuthStorage from '../hooks/useAuthStorage'
import useCurrentUser from '../hooks/useCurrentUser'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		height: 80,
		backgroundColor: theme.colors.navBarBackground,
	},

	scrollview: {
		flexDirection: 'row',
	},

	title: {
		marginLeft: 10,
		marginRight: 10,
		fontSize: 15,
		lineHeight: 80 - Constants.statusBarHeight,
		color: theme.colors.white,
	},
})

const AppBar = () => {
	const { data, error, loading, refetch } = useCurrentUser({
		includeReviews: false,
	})
	const authInfo = useAuthStorage()
	const apolloClient = useApolloClient()
	const navigate = useNavigate()

	if (loading) {
		return
	}

	const handleSignOut = async () => {
		await authInfo.removeAccessToken()
		refetch()
		apolloClient.resetStore()
		navigate('/')
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal style={styles.scrollview}>
				<Link to="/">
					<Text style={styles.title}>Repositories</Text>
				</Link>

				{data?.me ? (
					<AppItemsAfterSignIn handleSignOut={handleSignOut} />
				) : (
					<AppItemsBeforeSignIn />
				)}
			</ScrollView>
		</View>
	)
}

const AppItemsBeforeSignIn = () => {
	return (
		<>
			<Link to="/signIn">
				<Text style={styles.title}>Sign in</Text>
			</Link>
			<Link to="/signUp">
				<Text style={styles.title}>Sign up</Text>
			</Link>
		</>
	)
}

const AppItemsAfterSignIn = ({ handleSignOut }) => {
	return (
		<>
			<Link to="/createReview">
				<Text style={styles.title}>Create a review</Text>
			</Link>
			<Link to="/myreviews">
				<Text style={styles.title}>My reviews</Text>
			</Link>
			<Pressable onPress={handleSignOut}>
				<Text style={styles.title}>Sign out</Text>
			</Pressable>
		</>
	)
}

export default AppBar
