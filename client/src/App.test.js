import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

test('Renders a title', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Welcome to the Henry food app!/i);
  expect(linkElement).toBeInTheDocument();
})

test('Renders a subtitle', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Developed by: Santiago Cervan/i);
  expect(linkElement).toBeInTheDocument();
})
