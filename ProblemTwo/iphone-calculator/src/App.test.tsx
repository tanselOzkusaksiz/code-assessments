/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Calculator App', () => {
  // Test 1: Check if the calculator renders correctly with the initial display value of '0'.
  test('renders the calculator and initial display is 0', () => {
    const { container } = render(<App />);
    // We select the div with the specific class to avoid ambiguity with the '0' button.
    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('0');
  });

  // Test 2: Test number input by simulating clicks on number buttons.
  test('should display the number when a number key is pressed', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('7'));
    await userEvent.click(screen.getByText('8'));
    await userEvent.click(screen.getByText('9'));
    
    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('789');
  });

  // Test 3: Test a simple addition operation (e.g., 5 + 3 = 8).
  test('should perform addition correctly', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('3'));
    await userEvent.click(screen.getByText('='));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('8');
  });

  // Test 4: Test a simple subtraction operation (e.g., 9 - 4 = 5).
  test('should perform subtraction correctly', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('9'));
    await userEvent.click(screen.getByText('−')); // Note: using the minus symbol '−'
    await userEvent.click(screen.getByText('4'));
    await userEvent.click(screen.getByText('='));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('5');
  });

  // Test 5: Test a simple multiplication operation (e.g., 6 * 2 = 12).
  test('should perform multiplication correctly', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('6'));
    await userEvent.click(screen.getByText('×')); // Note: using the multiplication symbol '×'
    await userEvent.click(screen.getByText('2'));
    await userEvent.click(screen.getByText('='));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('12');
  });

  // Test 6: Test a simple division operation (e.g., 8 / 4 = 2).
  test('should perform division correctly', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('8'));
    await userEvent.click(screen.getByText('÷')); // Note: using the division symbol '÷'
    await userEvent.click(screen.getByText('4'));
    await userEvent.click(screen.getByText('='));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('2');
  });

  // Test 7: Test the 'AC' (All Clear) button to ensure it resets the state.
  test('should clear the display when AC is pressed', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('3'));
    await userEvent.click(screen.getByText('AC'));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('0');
  });

  // Test 8: Test the '+/-' (toggle sign) button.
  test('should toggle the sign of the number', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('±'));
    
    let display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('-5');

    await userEvent.click(screen.getByText('±'));
    display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('5');
  });
  
  // Test 9: Test the '%' (percentage) button.
  test('should calculate the percentage correctly', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('0')); // 50
    await userEvent.click(screen.getByText('%'));
    
    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('0.5');
  });

  // Test 10: Test division by zero, which should result in an 'Error'.
  test('should display "Error" when dividing by zero', async () => {
    const { container } = render(<App />);
    await userEvent.click(screen.getByText('5'));
    await userEvent.click(screen.getByText('÷'));
    await userEvent.click(screen.getByText('0'));
    await userEvent.click(screen.getByText('='));

    const display = container.querySelector('.displayValue');
    expect(display).toHaveTextContent('Error');
  });

  // Test 11: Test the new calculation history feature.
  test('should display the calculation history after pressing equals', async () => {
    const { container } = render(<App />);
    
    // Select the specific display areas using their class names.
    const calculationDisplay = container.querySelector('.calculationDisplay');
    const mainDisplay = container.querySelector('.displayValue');

    // Initially, the calculation history should be empty.
    expect(calculationDisplay).toHaveTextContent('');

    // Perform a calculation
    await userEvent.click(screen.getByText('3'));
    await userEvent.click(screen.getByText('6'));
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('6'));
    await userEvent.click(screen.getByText('='));

    // The result '42' should be in the main display.
    expect(mainDisplay).toHaveTextContent('42');

    // The calculation '36 + 6' should be in the history display.
    expect(calculationDisplay).toHaveTextContent('36 + 6');
  });

  // Test 12: Ensure calculation history clears when a new calculation starts.
  test('should clear the calculation history when a new number is entered after a calculation', async () => {
    const { container } = render(<App />);

    const calculationDisplay = container.querySelector('.calculationDisplay');
    const mainDisplay = container.querySelector('.displayValue');

    // Perform a calculation
    await userEvent.click(screen.getByText('1'));
    await userEvent.click(screen.getByText('0'));
    await userEvent.click(screen.getByText('−'));
    await userEvent.click(screen.getByText('2'));
    await userEvent.click(screen.getByText('='));

    // Check that history is displayed.
    expect(calculationDisplay).toHaveTextContent('10 - 2');

    // Start a new calculation
    await userEvent.click(screen.getByText('7'));

    // The history should now be cleared.
    expect(calculationDisplay).toHaveTextContent('');
    // The main display should show the new number.
    expect(mainDisplay).toHaveTextContent('7');
  });
});