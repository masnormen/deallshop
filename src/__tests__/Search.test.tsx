import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search';

describe('Search tests', () => {
  test('renders the syntax highlighted code correctly', () => {
    render(<Search />);
    const searchInput = screen.queryByTestId<HTMLInputElement>('search-input')!;
    const searchOverlay = screen.queryByTestId<HTMLDivElement>('search-overlay')!;
    fireEvent.change(searchInput, { target: { value: 'is:good' } });
    expect(searchInput.value).toBe('is:good');
    expect(searchOverlay).toContainHTML(
      `<span class="whitespace-pre text-green-700">is</span>:<span class="whitespace-pre text-yellow-900">good</span>`
    );
  });
});
