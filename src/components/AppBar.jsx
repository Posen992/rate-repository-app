import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'

import theme from '../theme'

import useAuthStorage from '../hooks/useAuthStorage'
import { useEffect, useState } from 'react'
import useMe from '../hooks/useMe'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		height: 60,
		backgroundColor: theme.colors.navBarBackground,
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
})

const AppBar = () => {
	const { data, error, loading, refetch } = useMe()
	const authInfo = useAuthStorage()
	const apolloClient = useApolloClient()

	if (loading) {
		return
	}

	const handleSignOut = async () => {
		await authInfo.removeAccessToken()
		refetch()
		apolloClient.resetStore()
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal style={styles.scrollview}>
				<Link to="/">
					<Text style={styles.title}>Repositories</Text>
				</Link>
				{data.me ? (
					<Pressable onPress={handleSignOut}>
						<Text style={styles.title}>Sign out</Text>
					</Pressable>
				) : (
					<Link to="/signIn">
						<Text style={styles.title}>Sign in</Text>
					</Link>
				)}
			</ScrollView>
		</View>
	)
}

export default AppBar
