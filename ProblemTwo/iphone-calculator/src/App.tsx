import React, { useState } from 'react';

import CalculatorDisplay from './components/calculator-display/calculator-display.component';
import CalculatorKeypad from './components/calculator-keypad/calculator-keypad.component';
import { KeyType } from './configs/calculator-config';

import './App.scss';

/**
 * The main component of the calculator application.
 * It manages the calculator's state and logic.
 */
const App = () => {
  /**
   * The value currently displayed on the calculator screen.
   * @type {string}
   */
  const [displayValue, setDisplayValue] = useState('0');
  /**
   * The previous value stored in memory, used for calculations.
   * @type {number | null}
   */
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  /**
   * The current operator (+, -, *, /).
   * @type {string | null}
   */
  const [operator, setOperator] = useState<string | null>(null);
  /**
   * A flag to indicate if the next input should overwrite the current display value.
   * This is set to true after an operator is pressed.
   * @type {boolean}
   */
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  /**
   * Stores the string of the last completed calculation to be displayed.
   * This is only set when the '=' key is pressed.
   * @type {string}
   */
  const [lastCalculation, setLastCalculation] = useState('');

  /**
   * Resets the calculator to its initial state.
   * This is triggered by the 'AC' button.
   */
  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastCalculation('');
  };

  /**
   * Handles the input of number keys (0-9 and '.').
   * Clears the last calculation string if a new calculation is started.
   * @param {string} value The value of the key that was pressed.
   */
  const handleNumberInput = (value: string) => {
    // If a calculation was just completed, clear the previous calculation string
    if (waitingForOperand && operator === null) {
      setLastCalculation('');
    }

    if (waitingForOperand) {
      setDisplayValue(value);
      setWaitingForOperand(false);
    } else {
      // Prevent multiple decimals and limit display length
      if (value === '.' && displayValue.includes('.')) return;
      if (displayValue.length >= 9) return;

      setDisplayValue(displayValue === '0' && value !== '.' ? value : displayValue + value);
    }
  };

  /**
   * Performs the calculation based on the previous value, current value, and operator.
   * @returns {number} The result of the calculation.
   */
  const performCalculation = (): number => {
    const prev = previousValue !== null ? previousValue : 0;
    const current = parseFloat(displayValue);
    if (isNaN(prev) || isNaN(current)) return current;

    let result = 0;
    switch (operator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/':
        result = current === 0 ? NaN : prev / current; // Division by zero handling
        break;
      default: return current;
    }
    // Format result to fit display and handle floating point issues
    return parseFloat(result.toPrecision(15));
  };

  /**
   * Handles the input of operator keys (+, -, *, /).
   * @param {string} nextOperator The operator key that was pressed.
   */
  const handleOperatorInput = (nextOperator: string) => {
    // Clear the last calculation when a new operator is used
    setLastCalculation('');
    const currentValue = parseFloat(displayValue);

    if (operator && waitingForOperand) {
      setOperator(nextOperator);
      return;
    }

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  /**
   * Handles the input of function keys (AC, +/-, %).
   * @param {string} value The value of the function key that was pressed.
   */
  const handleFunctionInput = (value: string) => {
    switch (value) {
      case 'AC':
        clearAll();
        break;
      case '+/-':
        setDisplayValue(String(parseFloat(displayValue) * -1));
        break;
      case '%':
        setDisplayValue(String(parseFloat(displayValue) / 100));
        setWaitingForOperand(true);
        break;
      default:
        break;
    }
  };

  /**
   * Handles all key clicks and routes them to the appropriate handler.
   * When '=' is pressed, it finalizes the calculation and sets the `lastCalculation` string.
   * @param {string} value The value of the key that was clicked.
   * @param {KeyType} type The type of key that was clicked (number, operator, or function).
   */
  const handleKeyClick = (value: string, type: KeyType) => {
    switch (type) {
      case KeyType.Number:
        handleNumberInput(value);
        break;
      case KeyType.Operator:
        if (value === '=') {
          if (operator && previousValue !== null) {
            const currentDisplayValue = displayValue;
            const result = performCalculation();

            // Set the string to be displayed above the result
            setLastCalculation(`${previousValue} ${operator} ${currentDisplayValue}`);

            setDisplayValue(
              isNaN(result) || !isFinite(result)
                ? 'Error'
                : String(Number(result.toPrecision(9)))
            );
            setPreviousValue(null);
            setOperator(null);
            setWaitingForOperand(true);
          }
        } else {
          handleOperatorInput(value);
        }
        break;
      case KeyType.Function:
        handleFunctionInput(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} calculation={lastCalculation} />
      <CalculatorKeypad onKeyClick={handleKeyClick} />
    </div>
  );
};

export default App;