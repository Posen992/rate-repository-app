import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
	query Query(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
		$first: Int
		$after: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
			edges {
				node {
					id
					fullName
					description
					language
					forksCount
					stargazersCount
					ratingAverage
					reviewCount
					ownerAvatarUrl
				}
				cursor
			}
			pageInfo {
				endCursor
				hasNextPage
				startCursor
				hasPreviousPage
			}
		}
	}
`

export const GET_REPOSITORIE_DETAIL = gql`
	query Query($repositoryId: ID!, $first: Int, $after: String) {
		repository(id: $repositoryId) {
			id
			fullName
			description
			language
			forksCount
			stargazersCount
			ratingAverage
			reviewCount
			ownerAvatarUrl
			url
			reviews(first: $first, after: $after) {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
				pageInfo {
					hasNextPage
					endCursor
					startCursor
				}
			}
		}
	}
`

export const SIGNIN = gql`
	mutation ($username: String!, $password: String!) {
		authenticate(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`

export const SIGNUP = gql`
	mutation ($username: String!, $password: String!) {
		createUser(user: { username: $username, password: $password }) {
			id
			username
		}
	}
`

export const GET_CURRENT_USER = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						createdAt
						rating
						text
						repository {
							id
							fullName
						}
					}
				}
			}
		}
	}
`

export const CREATE_REVIEW = gql`
	mutation (
		$repositoryName: String!
		$ownerName: String!
		$rating: Int!
		$text: String!
	) {
		createReview(
			review: {
				repositoryName: $repositoryName
				ownerName: $ownerName
				rating: $rating
				text: $text
			}
		) {
			id
		}
	}
`

export const DELETE_REVIEW = gql`
	mutation ($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`
