import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/fragments'

const useMe = () => {
	const { data, error, loading, refetch } = useQuery(GET_ME, {
		fetchPolicy: 'network-only',
	})

	return { data, error, loading, refetch }
}

export default useMe