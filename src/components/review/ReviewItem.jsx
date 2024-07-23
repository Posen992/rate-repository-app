import { Text, View, StyleSheet, Pressable } from 'react-native'
import theme from '../../theme'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		alignItems: 'top',
		flex: 1,
	},

	flexRowContainer: {
		flexDirection: 'row',
	},

	flexColumnContainer: {
		flexDirection: 'column',
	},

	ratingView: {
		width: 40,
		height: 40,
		borderWidth: 2,
		borderColor: theme.colors.tagBlue,
		borderRadius: 20,
		backgroundColor: theme.colors.white,
		marginLeft: 15,
		marginTop: 15,
	},

	ratingText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: theme.colors.tagBlue,
		textAlign: 'center',
		lineHeight: 38,
	},

	infoContainer: {
		marginLeft: 15,
		marginTop: 15,
		marginRight: 15,
		flex: 1,
	},

	nameText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: theme.colors.textPrimary,
	},

	dateText: {
		fontSize: 15,
		color: theme.colors.darkgray,
	},

	contentText: {
		marginTop: 15,
		flexWrap: 'wrap',
		marginBottom: 15,
	},

	viewRepositoryButton: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		backgroundColor: theme.colors.tagBlue,
		padding: 10,
		borderRadius: 5,
		flex: 1,
		textAlign: 'center',
	},

	deleteButton: {
		marginRight: 15,
		marginBottom: 15,
		backgroundColor: theme.colors.errorRed,
		padding: 10,
		borderRadius: 5,
		flex: 1,
	},

	buttonTitle: {
		color: theme.colors.white,
		textAlign: 'center',
	},
})

const ReviewItem = ({ item, isMyreviews, handleDelete }) => {
	const navigate = useNavigate()

	const getFormatDate = () => {
		const date = new Date(item.createdAt)
		const formatedDate = format(date, 'dd.MM.yyyy')

		return formatedDate
	}

	const handleViewRepository = () => {
		navigate(`/repository/${item.repository.id}`)
	}

	return (
		<View>
			<View style={[styles.container, styles.flexRowContainer]}>
				<View style={styles.ratingView}>
					<Text style={styles.ratingText}>{item.rating}</Text>
				</View>

				<View style={[styles.flexColumnContainer, styles.infoContainer]}>
					<Text style={styles.nameText}>
						{isMyreviews ? item.repository.fullName : item.user.username}
					</Text>
					<Text style={styles.dateText}>{getFormatDate()}</Text>
					<Text style={styles.contentText}>{item.text}</Text>
				</View>
			</View>

			{isMyreviews && (
				<View style={styles.flexRowContainer}>
					<Pressable
						style={styles.viewRepositoryButton}
						onPress={handleViewRepository}
					>
						<Text style={styles.buttonTitle}>View repository</Text>
					</Pressable>
					<Pressable
						style={styles.deleteButton}
						onPress={() => {
							handleDelete(item.id)
						}}
					>
						<Text style={styles.buttonTitle}>Delete review</Text>
					</Pressable>
				</View>
			)}
		</View>
	)
}

export default ReviewItem
