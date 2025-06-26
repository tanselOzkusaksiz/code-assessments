import React from 'react';
import styles from './calculator-display.module.scss';

/**
 * The properties for the CalculatorDisplay component.
 * @interface DisplayProps
 */
interface DisplayProps {
  /** The value to display on the screen. */
  value: string;
}

/**
 * The display component for the calculator.
 * It shows the current value and adjusts the font size based on the length of the value.
 * @param {DisplayProps} props The properties for the component.
 * @returns {React.FC<DisplayProps>} A React functional component.
 */
const CalculatorDisplay: React.FC<DisplayProps> = ({ value }) => {
  /**
   * Determines the font size class based on the length of the display value.
   * This is to ensure the value fits within the display area.
   * @returns {string} The CSS class name for the font size.
   */
  const getFontSize = () => {
    if (value.length > 9) return styles.smallFont;
    if (value.length > 6) return styles.mediumFont;
    return styles.largeFont;
  };

  return (
    <div className={styles.displayContainer}>
      <div className={`${styles.displayValue} ${getFontSize()}`}>
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;