import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import theme from '../../theme'

import Counter from './Counter'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
	flexRowContainer: {
		flexDirection: 'row',
	},
	flexColumnContainer: {
		flexDirection: 'column',
	},

	container: {
		backgroundColor: theme.colors.white,
	},

	baseInfoContainer: {
		margin: 15,
	},

	textInfoContainer: {
		marginRight: 15,
	},

	counterContainer: {
		marginTop: 15,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 15,
		alignItems: 'center',
		width: 'calc(100% - 80px)',
		justifyContent: 'space-between',
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 5,
	},
	fullName: {
		marginLeft: 15,
		fontWeight: 'bold',
		fontFamily: theme.fontFamily.system,
	},
	description: {
		marginLeft: 15,
		marginTop: 5,
		flexWrap: 'wrap',
		color: theme.colors.darkgray,
	},
	language: {
		marginLeft: 15,
		marginTop: 5,
		backgroundColor: theme.colors.tagBlue,
		padding: 5,
		color: theme.colors.white,
		borderRadius: 5,
	},

	openButton: {
		borderRadius: 5,
		padding: 10,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		backgroundColor: theme.colors.tagBlue,
	},

	openButtonText: {
		color: theme.colors.white,
		textAlign: 'center',
	},
})

const RepositoryItem = ({ item }) => {
	const navigate = useNavigate()

	const goRepositoryDetail = () => {
		if (!item.url) {
			navigate(`/repository/${item.id}`)
		}
	}

	const handleGotoGitHub = () => {
		Linking.openURL(item.url)
	}

	return (
		<Pressable
			style={[styles.container, styles.flexColumnContainer]}
			testID="repositoryItem"
			onPress={goRepositoryDetail}
		>
			<View style={[styles.flexRowContainer, styles.baseInfoContainer]}>
				<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
				<View style={[styles.flexColumnContainer, styles.textInfoContainer]}>
					<Text style={styles.fullName}>{item.fullName}</Text>
					<Text style={styles.description}>{item.description}</Text>
					<View style={styles.flexRowContainer}>
						<Text style={styles.language}>{item.language}</Text>
					</View>
				</View>
			</View>
			<View style={[styles.flexRowContainer, styles.counterContainer]}>
				<Counter
					style={styles.counter}
					title="Stars"
					count={item.stargazersCount}
				/>
				<Counter style={styles.counter} title="Forks" count={item.forksCount} />
				<Counter style={styles.counter} title="Reviews" count={item.reviewCount} />
				<Counter style={styles.counter} title="Rating" count={item.ratingAverage} />
			</View>
			{item.url && (
				<Pressable style={styles.openButton} onPress={handleGotoGitHub}>
					<Text style={styles.openButtonText}>Open in GitHub</Text>
				</Pressable>
			)}
		</Pressable>
	)
}

export default RepositoryItem
