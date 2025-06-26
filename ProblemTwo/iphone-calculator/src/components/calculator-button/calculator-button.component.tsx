import React from 'react';
import styles from './calculator-button.module.scss';
import { KeyType } from '../../configs/calculator-config';

/**
 * Enum for button types.
 */
export enum ButtonType {
  Operator = 'operator',
  Function = 'function',
  Number = 'number',
}

/**
 * The properties for the CalculatorButton component.
 * @interface ButtonProps
 */
interface ButtonProps {
  /** The text to display on the button. */
  label: string;
  /** The value of the button when clicked. */
  value: string;
  /** The type of button (e.g., 'operator', 'function', 'number'). */
  type: KeyType;
  /** A flag to indicate if the button is the '0' key, which has a different style. */
  isZero?: boolean;
  /** The function to call when the button is clicked. */
  onClick: (value: string, type: KeyType) => void;
}

/**
 * A reusable button component for the calculator.
 * @param {ButtonProps} props The properties for the component.
 * @returns {React.FC<ButtonProps>} A React functional component.
 */
const CalculatorButton: React.FC<ButtonProps> = ({ label, value, type, isZero, onClick }) => {

  /**
   * Determines the CSS class for the button based on its type.
   * @returns {string} The CSS class name.
   */
  const getButtonClass = () => {
    switch (type) {
      case KeyType.Operator:
        return styles.operator;
      case KeyType.Function:
        return styles.function;
      default:
        return styles.number;
    }
  };

  /**
   * Adds a special class for the '0' button to make it wider.
   * @type {string}
   */
  const zeroClass = isZero ? styles.zero : '';

  return (
    <button
      className={`${styles.button} ${getButtonClass()} ${zeroClass}`}
      onClick={() => onClick(value, type)}
      aria-label={label}
      type="button"
    >
      {label}
    </button>
  );
};

export default CalculatorButton;