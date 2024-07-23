import {
	FlatList,
	View,
	StyleSheet,
	Text,
	Pressable,
	Modal,
} from 'react-native'
import { Menu, Searchbar } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import theme from '../../theme'
import RepositoryItem from './RepositoryItem'

import { useRepositories } from '../../hooks/useRepository'
import { useDispatch, useSelector } from 'react-redux'
import {
	setOrderAndSearchConfig,
	setSelectedOrder,
	setSearchKeyword,
} from '../../reducers/repositoryReducer'
import { ref } from 'yup'
import ListItemSeparator from '../commons/ListItemSeparator'

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.lightgray,
	},
	orderButton: {
		height: 50,
	},
	orderText: {
		lineHeight: 50,
		marginLeft: 20,
	},
	floatingView: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '100%',
		height: '100%',
		alignItems: 'center',
	},
	pickerView: {
		flex: 1,
		width: '70%',
		justifyContent: 'center',
	},
	menuItem: {
		width: '100%',
		backgroundColor: theme.colors.white,
	},
	searchBar: {
		height: 40,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: 'white',
	},
	searchBarInput: {
		minHeight: 0,
	},
	listHeaderContainer: {
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
})

const ListHeader = ({ refetch }) => {
	const dispatch = useDispatch()
	const orderAndSearchConfig = useSelector(
		(state) => state.repository.orderAndSearchConfig
	)
	const selectedOrder = useSelector((state) => state.repository.selectedOrder)
	const searchKeyword = useSelector(
		(state) => state.repository.orderAndSearchConfig.searchKeyword
	)

	const [isFirstRender, setIsFirstRender] = useState(true)

	const [isShowPicker, setIsShowPicker] = useState(false)
	const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

	useEffect(() => {
		if (debouncedSearchKeyword) {
			console.log(orderAndSearchConfig)
			refetch(orderAndSearchConfig)
		}
	}, [debouncedSearchKeyword])

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		}
		refetch(orderAndSearchConfig)
	}, [orderAndSearchConfig])

	const handleOrder = (option) => {
		switch (option) {
			case 'Latest repositories':
				dispatch(
					setOrderAndSearchConfig({
						orderBy: 'CREATED_AT',
						orderDirection: 'DESC',
					})
				)
				break
			case 'Highest rated repositories':
				dispatch(
					setOrderAndSearchConfig({
						orderBy: 'RATING_AVERAGE',
						orderDirection: 'DESC',
					})
				)
				break
			case 'Lowest rated repositories':
				dispatch(
					setOrderAndSearchConfig({
						orderBy: 'RATING_AVERAGE',
						orderDirection: 'ASC',
					})
				)
				break
			default:
				break
		}

		dispatch(setSelectedOrder(option))
		setIsShowPicker(false)
	}

	const onSearchQueryChange = (text) => {
		dispatch(setSearchKeyword(text))
	}

	return (
		<View style={styles.listHeaderContainer}>
			<Searchbar
				mode="view"
				style={styles.searchBar}
				placeholder="Search"
				onChangeText={onSearchQueryChange}
				value={searchKeyword}
				inputStyle={styles.searchBarInput}
			/>
			<Pressable
				style={styles.orderButton}
				onPress={() => {
					setIsShowPicker(true)
				}}
			>
				<Text style={styles.orderText}>{selectedOrder}</Text>
			</Pressable>

			<Modal transparent={true} visible={isShowPicker} animationType="slide">
				<View style={styles.floatingView}>
					<View style={styles.pickerView}>
						<Menu.Item style={styles.menuItem} title="Select an item..." disabled />
						<Menu.Item
							style={styles.menuItem}
							onPress={() => {
								handleOrder('Latest repositories')
							}}
							title="Latest repositories"
						/>
						<Menu.Item
							style={styles.menuItem}
							onPress={() => {
								handleOrder('Highest rated repositories')
							}}
							title="Highest rated repositories"
						/>
						<Menu.Item
							style={styles.menuItem}
							onPress={() => {
								handleOrder('Lowest rated repositories')
							}}
							title="Lowest rated repositories"
						/>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export const RepositoryListContainer = ({
	repositories,
	refetch,
	onEndReached,
}) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: []

	return (
		<FlatList
			ListHeaderComponent={<ListHeader refetch={refetch} />}
			data={repositoryNodes}
			ItemSeparatorComponent={ListItemSeparator}
			renderItem={(item) => <RepositoryItem item={item.item} />}
			keyExtractor={(item) => item.id}
			onEndReached={onEndReached}
		/>
	)
}

const RepositoryList = () => {
	const { data, error, loading, refetch, fetchMore } = useRepositories({
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC',
		searchKeyword: '',
		first: 4,
	})

	const onEndReached = () => {
		fetchMore()
	}

	return (
		<RepositoryListContainer
			repositories={data?.repositories}
			refetch={refetch}
			onEndReached={onEndReached}
		/>
	)
}

export default RepositoryList
