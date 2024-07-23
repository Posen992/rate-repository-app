import '@testing-library/jest-native/extend-expect'

import {
	render,
	screen,
	fireEvent,
	waitFor,
} from '@testing-library/react-native'

import { SignInContainer } from '../../../components/sign/SignIn'

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			// render the SignInContainer component, fill the text inputs and press the submit button
			const onEventMock = jest.fn()

			render(<SignInContainer onSubmit={onEventMock} />)

			fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle')
			fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')

			fireEvent.press(screen.getByText('Sign in'))

			await waitFor(() => {
				expect(onEventMock).toHaveBeenCalledWith(
					expect.objectContaining({
						username: 'kalle',
						password: 'password',
					}),
					expect.anything()
				)
			})
		})
	})
})
