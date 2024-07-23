import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/fragments'

const useCurrentUser = ({ fetchPolicy, includeReviews }) => {
	const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: fetchPolicy ? fetchPolicy : 'network-only',
		variables: {
			includeReviews,
		},
	})
	

	return { data, error, loading, refetch }
}

export default useCurrentUser
