import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'

import Constants from 'expo-constants'

import { ApolloProvider } from '@apollo/client'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'

import store from './src/reducers/store'
import { Provider } from 'react-redux'



const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
	console.log(Constants.expoConfig)

	return (
		<NativeRouter>
			<Provider store={store}>
				<ApolloProvider client={apolloClient}>
					<AuthStorageContext.Provider value={authStorage}>
						<Main />
					</AuthStorageContext.Provider>
				</ApolloProvider>
			</Provider>
		</NativeRouter>
	)
}
