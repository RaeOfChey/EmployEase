import pretty from 'pretty';
import { render } from '@testing-library/react';
import SearchResultCard from '../components/SearchResultCard';

describe('SearchResultCard', () => {

  const mockJob = {
    jobId: '123',
    content: 'This is a job description.',
    jobTitle: 'Frontend Developer',
    datePublished: '2024-06-01',
    refs: {
      // Assuming `Ref` has specific properties; add mock data accordingly
      landingPage: 'https://example.com/job/123',
    },
    levels: [
      {
        name: 'Mid-Level',
      },
    ],
    locations: [
      {
        name: 'Remote',
      },
    ],
    company: {
      name: 'Tech Corp',
    },
  };


  it('should contain the expected text', () => {
    render(<SearchResultCard job={mockJob} />);

    const itemElement = document.querySelector('h2');

    if (itemElement) {
      expect(itemElement.textContent).toBe('Simple Calculator');  
    }
    
  });

  it('should match snapshot', () => {
    render(<SearchResultCard job={mockJob} />);

    const cardElement = document.querySelector('.card'); 

    if (cardElement) {
      expect(pretty(cardElement.innerHTML)).toMatchSnapshot();
    }
  });
});
