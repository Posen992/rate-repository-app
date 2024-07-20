import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/fragments'

const useRepositories = () => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	})

	return { data, error, loading, refetch }
}

export default useRepositories
