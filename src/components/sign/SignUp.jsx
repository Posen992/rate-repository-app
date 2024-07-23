import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { useFormik } from 'formik'
import theme from '../../theme'
import * as yup from 'yup'

import useSignUp from '../../hooks/useSignUp'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../../hooks/useAuthStorage'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.darkgray,
		borderRadius: 5,
		padding: 10,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
	},
	signInButton: {
		borderRadius: 5,
		padding: 10,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: theme.colors.tagBlue,
	},
	signInButtonText: {
		color: theme.colors.white,
		textAlign: 'center',
	},
	errorText: {
		marginLeft: 15,
		marginTop: 5,
		color: theme.colors.errorRed,
	},
})

const initialValues = {
	username: '',
	password: '',
	passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(5, 'Username is a required string with a length between 5 and 30')
		.max(30, 'Username is a required string with a length between 5 and 30'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password is a required string with a length between 5 and 50')
		.max(50, 'Password is a required string with a length between 5 and 50'),
	passwordConfirmation: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			'Password confirmation matches the password'
		)
		.required('Password confirmation is required'),
})

const SignUp = () => {
	const { SignUp } = useSignUp()
	const { SignIn } = useSignIn()
	const authInfo = useAuthStorage()
	const navigate = useNavigate()
	const apolloClient = useApolloClient()
	const [error, setError] = useState(null)

	const onSubmit = async (values) => {
		const { username, password } = values
		try {
			const { data } = await SignUp({
				username,
				password,
			})

			signIn(values)
		} catch (e) {
			setError(e.graphQLErrors[0])
		}
	}

	const signIn = async (values) => {
		const { username, password } = values
		try {
			const { data } = await SignIn({
				username,
				password,
			})

			await authInfo.setAccessToken(data.authenticate.accessToken)
			apolloClient.resetStore()
			navigate('/')
		} catch (e) {
			setError(e.graphQLErrors)
		}
	}

	return <SignUpContainer onSubmit={onSubmit} error={error} />
}

export const SignUpContainer = ({ onSubmit, error }) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: onSubmit,
	})

	const getInputBorderColor = (field) => {
		return formik.touched[field] && formik.errors[field]
			? theme.colors.errorRed
			: theme.colors.darkgray
	}

	return (
		<View style={styles.container}>
			{error && <Text style={styles.errorText}>{error.message}</Text>}
			<TextInput
				testID="usernameInput"
				style={[styles.input, { borderColor: getInputBorderColor('username') }]}
				placeholder="Username"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			></TextInput>
			{formik.touched.username && formik.errors.username && (
				<Text style={styles.errorText}>{formik.errors.username}</Text>
			)}
			<TextInput
				style={[styles.input, { borderColor: getInputBorderColor('password') }]}
				placeholder="Password"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
				secureTextEntry
			></TextInput>
			{formik.touched.password && formik.errors.password && (
				<Text style={styles.errorText}>{formik.errors.password}</Text>
			)}
			<TextInput
				style={[
					styles.input,
					{ borderColor: getInputBorderColor('passwordConfirmation') },
				]}
				placeholder="Password confirmation"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.passwordConfirmation}
				onChangeText={formik.handleChange('passwordConfirmation')}
				secureTextEntry
			></TextInput>
			{formik.touched.passwordConfirmation &&
				formik.errors.passwordConfirmation && (
					<Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
				)}
			<Pressable style={styles.signInButton} onPress={formik.handleSubmit}>
				<Text style={styles.signInButtonText}>Sign in</Text>
			</Pressable>
		</View>
	)
}

export default SignUp
