import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'

import RepositoryList from './repository/RepositoryList'

import AppBar from './AppBar'
import RepositoryDetail from './repository/RepositoryDetail'
import ReviewForm from './review/ReviewFrom'
import SignIn from './sign/SignIn'
import SignUp from './sign/SignUp'
import MyReviewList from './review/MyReviewList'
import useAuthStorage from '../hooks/useAuthStorage'

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
	},
})

const Main = () => {
	const authInfo = useAuthStorage()

	console.log(authInfo.getAccessToken())

	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				// <Route path="/" element={<RepositoryList />} />
				// <Route path="/signIn" element={<SignIn />} />
				// <Route path="/signUp" element={<SignUp />} />
				// <Route path="/myreviews" element={<MyReviewList />} />
				// <Route path="/repository/:id" element={<RepositoryDetail />} />
				// <Route path="/createReview" element={<ReviewForm />} />
				// <Route path="*" element={<Navigate to="/" replace />} />
				//{' '}
			</Routes>
		</View>
	)
}

export default Main
