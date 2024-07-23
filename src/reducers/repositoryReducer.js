import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	orderAndSearchConfig: {
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC',
		searchKeyword: '',
	},
	selectedOrder: 'Latest repositories',
}

const repositorySlices = createSlice({
	name: 'repository',
	initialState,
	reducers: {
		setOrderAndSearchConfig: (state, action) => {
			console.log('setOrderAndSearchConfig:', action.payload)
			const newState = {
				...state,
				orderAndSearchConfig: {
					...state.orderAndSearchConfig,
					...action.payload,
				},
			}
			console.log('newState:', newState)

			return newState
		},
		setSelectedOrder: (state, action) => {
			const newState = {
				...state,
				selectedOrder: action.payload,
			}

			return newState
		},
		setSearchKeyword: (state, action) => {
			const newState = {
				...state,
				orderAndSearchConfig: {
					...state.orderAndSearchConfig,
					searchKeyword: action.payload,
				},
			}

			return newState
		},
	},
})

export const { setOrderAndSearchConfig, setSelectedOrder, setSearchKeyword } =
	repositorySlices.actions
export default repositorySlices.reducer
