import { fireEvent, render } from '@testing-library/react-native';
import Authentification from '../path/to/Authentification';

test('Login with valid credentials', () => {
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
