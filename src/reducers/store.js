import { configureStore } from '@reduxjs/toolkit'

import repositoryrReducer from './repositoryReducer'

const initialStore = () => {
	return configureStore({
		reducer: {
			repository: repositoryrReducer,
		},
	})
}

const store = initialStore()

console.log('store:', store.getState())

export default store
