import React from 'react';
import CalculatorButton from '../calculator-button/calculator-button.component';
import styles from './calculator-keypad.module.scss';
import { calculatorKeys, KeyType } from '../../configs/calculator-config';

/**
 * The properties for the CalculatorKeypad component.
 * @interface KeypadProps
 */
export interface KeypadProps {
  /** The function to call when a key is clicked. */
  onKeyClick: (value: string, type: KeyType) => void;
}

/**
 * The shape of a calculator key.
 */
export interface CalculatorKey {
  label: string;
  value: string;
  type: KeyType;
  isZero?: boolean;
}

/**
 * The keypad component for the calculator.
 * It renders all the calculator buttons.
 * @param {KeypadProps} props The properties for the component.
 * @returns {React.FC<KeypadProps>} A React functional component.
 */
const CalculatorKeypad: React.FC<KeypadProps> = ({ onKeyClick }) => {
  return (
    <div className={styles.keypad}>
      {calculatorKeys.map((key: CalculatorKey) => (
        <CalculatorButton
          key={key.value}
          label={key.label}
          value={key.value}
          type={key.type}
          isZero={key.isZero || false}
          onClick={onKeyClick}
        />
      ))}
    </div>
  );
};

export default CalculatorKeypad;