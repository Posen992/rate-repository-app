import { useMutation } from '@apollo/client'

import { CREATE_REVIEW, DELETE_REVIEW } from '../graphql/fragments'

export const useCreateReview = () => {
	const [mutate] = useMutation(CREATE_REVIEW)

	const createReview = ({ repositoryName, ownerName, rating, text }) => {
		return mutate({
			variables: {
				repositoryName,
				ownerName,
				rating: Number(rating),
				text,
			},
		})
	}

	return { createReview }
}

export const useDeleteReview = () => {
	const [mutate] = useMutation(DELETE_REVIEW)

	const deleteReview = ({ deleteReviewId }) => {
		return mutate({
			variables: {
				deleteReviewId,
			},
		})
	}

	return { deleteReview }
}
