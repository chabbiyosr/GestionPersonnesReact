import Authentification from '../path/to/Authentification';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: '123' } }),
  })),
}));

test('Login with valid credentials', async () => {
  const { getByPlaceholderText, getByText } = render(<Authentification />);

  const emailInput = getByPlaceholderText('email');
  const passwordInput = getByPlaceholderText('password');
  const submitButton = getByText('Submit');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'testpassword');

  fireEvent.press(submitButton);

  // Add assertions here to test the login functionality
  // For example, check if the navigation to 'acceuil' is triggered upon successful login
});
