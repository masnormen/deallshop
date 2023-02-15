import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Home tests', () => {
  test('renders learn react link', () => {
    render(<Home />);
    const linkElement = screen.getByText(/Vimi/i);
    expect(linkElement).toBeInTheDocument();
  });
});
