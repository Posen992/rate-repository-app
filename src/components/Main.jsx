import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'

import RepositoryList from './repository/RepositoryList'
import SignIn from './sign/SignIn'
import AppBar from './AppBar'

const styles = StyleSheet.create({
	container: {
		// margin: 0,
		width: '100%',
	},
})

const Main = () => {

	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	)
}

export default Main
