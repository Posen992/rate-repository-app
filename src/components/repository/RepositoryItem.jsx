import { Text, View, StyleSheet, Image } from 'react-native-web'
import theme from '../../theme'

import Counter from './Counter'

const styles = StyleSheet.create({
	flexRowContainer: {
		flexDirection: 'row',
	},
	flexColumnContainer: {
		flexDirection: 'column',
	},

	container: {
		margin: 15,
	},

	baseInfoContainer: {
		width: '100%',
	},

	textInfoContainer: {
		width: 'calc(100% - 40px - 15px)',
	},

	counterContainer: {
        marginTop: 15,
        marginLeft:40,
        marginRight:40,
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
})

const RepositoryItem = ({ item }) => {
	return (
		<View style={[styles.container, styles.flexColumnContainer]}>
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
		</View>
	)
}

export default RepositoryItem
