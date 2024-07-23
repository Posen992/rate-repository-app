import ReviewItem from './ReviewItem'
import { FlatList, Text, Alert, StyleSheet, View } from 'react-native'
import useCurrentUser from '../../hooks/useCurrentUser'
import ListItemSeparator from '../commons/ListItemSeparator'
import { useDeleteReview } from '../../hooks/useReview'

const MyReviewList = () => {
	const { data, error, loading, refetch } = useCurrentUser({
		includeReviews: true,
	})
	const { deleteReview } = useDeleteReview()
	console.log('MyReviewList')

	if (loading) {
		return <Text>Loading...</Text>
	}
	console.log(data)

	const handleDelete = async (deleteReviewId) => {
		Alert.alert('Delete Review', 'Are you sure to delete it?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				onPress: () => deleteReviewById(deleteReviewId),
				style: 'default',
			},
		])
	}

	const deleteReviewById = async (deleteReviewId) => {
		console.log('deleteReviewId:', deleteReviewId)
		try {
			await deleteReview({
				deleteReviewId,
			})

			refetch({ fetchPolicy: 'cache-first', includeReviews: true })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<FlatList
			data={data.me.reviews.edges}
			renderItem={({ item }) => (
				<ReviewItem
					item={item.node}
					isMyreviews={true}
					handleDelete={handleDelete}
				/>
			)}
			keyExtractor={(item) => item.node.id}
			ItemSeparatorComponent={ListItemSeparator}
		></FlatList>
	)
}

export default MyReviewList
