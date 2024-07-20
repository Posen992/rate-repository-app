import { FlatList, View, StyleSheet, Text } from 'react-native'

import theme from '../../theme'
import RepositoryItem from './RepositoryItem'

import useRepositories from '../../hooks/useRepositories'
import useAuthStorage from '../../hooks/useAuthStorage'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	separator: {
		height: 10,
		backgroundColor: theme.colors.lightgray,
	},
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
	const { data, error, loading, refetch } = useRepositories()

	if (loading) {
		return <Text>Loading...</Text>
	}

	const repositoryNodes = data
		? data.repositories.edges.map((edge) => edge.node)
		: []

	return (
		<View style={styles.container}>
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={(item) => <RepositoryItem item={item.item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	)
}

export default RepositoryList
