import { useMutation } from '@apollo/client'

import { SIGNIN } from '../graphql/fragments'

const useSignIn = () => {
	const [mutate] = useMutation(SIGNIN)

	const SignIn = ({ username, password }) => {
		return mutate({
			variables: {
				username,
				password,
			},
		})
	}

	return { SignIn }
}

export default useSignIn
