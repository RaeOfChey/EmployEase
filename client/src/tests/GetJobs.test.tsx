import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchJobs from '../pages/SearchJobs';  // Adjust the path as needed
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

// Mock Auth utility
jest.mock('../utils/auth', () => ({
  loggedIn: jest.fn().mockReturnValue(true),
  getToken: jest.fn().mockReturnValue('mock-token'),
}));

describe('SearchJobs Page', () => {
  it('renders the SearchJobs page when navigating to /search-jobs', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/search-jobs']}>
          <Routes>
            <Route path="/search-jobs" element={<SearchJobs />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    // Check for initial heading text
    expect(await screen.findByText(/Job Results/i)).toBeInTheDocument();

    // Check for button to input a job
    expect(screen.getByRole('button', { name: /Input a job/i })).toBeInTheDocument();
  });
});