import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES, GET_REPOSITORIE_DETAIL } from '../graphql/fragments'

export const useRepositories = (variables) => {
	const { data, error, loading, refetch, fetchMore } = useQuery(
		GET_REPOSITORIES,
		{
			fetchPolicy: 'cache-and-network',
			variables,
		}
	)

	const handleFetchMore = () => {
		if (!data?.repositories.pageInfo.hasNextPage) {
			return
		}

		fetchMore({
			variables: {
				orderBy: 'CREATED_AT',
				orderDirection: 'DESC',
				searchKeyword: '',
				first: 4,
				after: data?.repositories.pageInfo.endCursor,
			},
		})
	}

	return { data, error, loading, refetch, fetchMore: handleFetchMore }
}

export const ussRepositoryDetail = (variables) => {
	const { data, error, loading, refetch, fetchMore } = useQuery(
		GET_REPOSITORIE_DETAIL,
		{
			fetchPolicy: 'cache-and-network',
			variables,
		}
	)

	const handleFetchMore = () => {
		if (!data?.repository.reviews.pageInfo.hasNextPage) {
			return
		}

		fetchMore({
			variables: {
				first: 4,
				after: data?.repository.reviews.pageInfo.endCursor,
			},
		})
	}

	return { data, error, loading, refetch, fetchMore: handleFetchMore }
}
