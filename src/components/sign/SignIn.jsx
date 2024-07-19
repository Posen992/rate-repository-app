import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import { useFormik } from 'formik'
import theme from '../../theme'
import * as yup from 'yup'

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
}

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
})

const SignIn = () => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			console.log(values)
		},
	})

	const getInputBorderColor = (field) => {
		return formik.touched[field] && formik.errors[field]
			? theme.colors.errorRed
			: theme.colors.darkgray
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, { borderColor: getInputBorderColor('username') }]}
				placeholder="Username"
                placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.username}
				onChange={formik.handleChange('username')}
			></TextInput>
			{formik.touched.username && formik.errors.username && (
				<Text style={styles.errorText}>{formik.errors.username}</Text>
			)}
			<TextInput
				style={[styles.input, { borderColor: getInputBorderColor('password') }]}
				placeholder="Password"
                placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.password}
				onChange={formik.handleChange('password')}
				secureTextEntry
			></TextInput>
			{formik.touched.password && formik.errors.password && (
				<Text style={styles.errorText}>{formik.errors.password}</Text>
			)}
			<Pressable style={styles.signInButton} onPress={formik.handleSubmit}>
				<Text style={styles.signInButtonText}>Sign in</Text>
			</Pressable>
		</View>
	)
}

export default SignIn
