import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // Check for a text that should be present, e.g., "MathQuest" or the user's name "Alex"
  const linkElement = screen.getByText(/MathQuest/i);
  expect(linkElement).toBeInTheDocument();
});
