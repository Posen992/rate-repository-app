import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import theme from '../../theme'
import * as yup from 'yup'
import { useCreateReview } from '../../hooks/useReview'
import { useNavigate } from 'react-router-native'
import { useApolloClient } from '@apollo/client'

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
	createButton: {
		borderRadius: 5,
		padding: 10,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: theme.colors.tagBlue,
	},
	createButtonText: {
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
	repositoryOwnerName: '',
	repositoryName: '',
	rating: '',
	review: '',
}

const validationSchema = yup.object().shape({
	repositoryOwnerName: yup
		.string()
		.required('Repository Owner Name is required'),
	repositoryName: yup.string().required('Repository Name is required'),
	rating: yup.number().required('Rating is required'),
	review: yup.string().required('Review is required'),
})

const ReviewForm = () => {
	const { createReview } = useCreateReview()
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const apolloClient = useApolloClient()

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			const { repositoryOwnerName, repositoryName, rating, review } = values
			try {
				await createReview({
					repositoryName,
					ownerName: repositoryOwnerName,
					rating,
					text: review,
				})

				apolloClient.resetStore()
				navigate('/')
			} catch (e) {
				console.log(e)
				setError(e.graphQLErrors[0])
			}
		},
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
				style={[
					styles.input,
					{ borderColor: getInputBorderColor('repositoryOwnerName') },
				]}
				placeholder="Repository owner name"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.repositoryOwnerName}
				onChangeText={formik.handleChange('repositoryOwnerName')}
			></TextInput>
			{formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName && (
				<Text style={styles.errorText}>{formik.errors.repositoryOwnerName}</Text>
			)}
			<TextInput
				style={[
					styles.input,
					{ borderColor: getInputBorderColor('repositoryName') },
				]}
				placeholder="Repository name"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.repositoryName}
				onChangeText={formik.handleChange('repositoryName')}
			></TextInput>
			{formik.touched.repositoryName && formik.errors.repositoryName && (
				<Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
			)}
			<TextInput
				style={[styles.input, { borderColor: getInputBorderColor('rating') }]}
				placeholder="Rating between 0 and 100"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.rating}
				onChangeText={formik.handleChange('rating')}
			></TextInput>
			{formik.touched.rating && formik.errors.rating && (
				<Text style={styles.errorText}>{formik.errors.rating}</Text>
			)}
			<TextInput
				multiline={true}
				style={[styles.input, { borderColor: getInputBorderColor('review') }]}
				placeholder="review"
				placeholderTextColor={theme.colors.placeHolder}
				value={formik.values.review}
				onChangeText={formik.handleChange('review')}
				secureTextEntry
			></TextInput>
			{formik.touched.review && formik.errors.review && (
				<Text style={styles.errorText}>{formik.errors.review}</Text>
			)}
			<Pressable style={styles.createButton} onPress={formik.handleSubmit}>
				<Text style={styles.createButtonText}>Create a review</Text>
			</Pressable>
		</View>
	)
}

export default ReviewForm
