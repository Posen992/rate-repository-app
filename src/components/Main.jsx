import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar'

const styles = StyleSheet.create({
	container: {
        // margin: 0,
        width:'100%',
	},
})

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<RepositoryList />
		</View>
	)
}

export default Main
