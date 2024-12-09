import pretty from 'pretty';
import { render } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  it('should contain the expected text', () => {
    render(<Calculator />);

    const itemElement = document.querySelector('h2');

    if (itemElement) {
      expect(itemElement.textContent).toBe('Simple Calculator');  
    }
    
  });

  it('should match snapshot', () => {
    render(<Calculator />);

    const calculatorElement = document.querySelector('.calculator');

    if (calculatorElement) {
      expect(pretty(calculatorElement.innerHTML)).toMatchSnapshot();
    }
  });
});
