import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import theme from '../../theme'

import RepositoryItem from './RepositoryItem'
import ReviewItem from '../review/ReviewItem'

import { GET_REPOSITORIE_DETAIL } from '../../graphql/fragments'
import { ussRepositoryDetail } from '../../hooks/useRepository'

import ListItemSeparator from '../commons/ListItemSeparator'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
	},
})

const RepositoryDetail = () => {
	const repositoryId = useParams().id

	const { data, error, loading, refetch, fetchMore } = ussRepositoryDetail({
		repositoryId,
		first: 4,
	})

	if (loading) {
		return <Text>Loading...</Text>
	}

	const handleEndReached = () => {
		fetchMore()
	}

	return (
		<>
			<View style={styles.container}>
				<RepositoryItem item={data.repository} />

				<FlatList
					style={styles.flatlist}
					data={data.repository.reviews.edges}
					renderItem={({ item }) => (
						<ReviewItem item={item.node} isMyreviews={false} />
					)}
					keyExtractor={(item) => item.node.id}
					ItemSeparatorComponent={ListItemSeparator}
					onEndReached={handleEndReached}
				></FlatList>
			</View>
		</>
	)
}

export default RepositoryDetail
