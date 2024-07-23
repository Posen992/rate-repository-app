import { useMutation } from '@apollo/client'

import { SIGNUP } from '../graphql/fragments'

const useSignUp = () => {
	const [mutate] = useMutation(SIGNUP)

	const SignUp = ({ username, password }) => {
		return mutate({
			variables: {
				username,
				password,
			},
		})
	}

	return { SignUp }
}

export default useSignUp
