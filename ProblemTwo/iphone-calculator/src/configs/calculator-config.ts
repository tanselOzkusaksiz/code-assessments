/**
 * Enum for types of keys on the calculator.
 */
export enum KeyType {
  Number = 'number',
  Operator = 'operator',
  Function = 'function',
}

/**
 * An array of objects that define the properties of each calculator key.
 * This is used to generate the buttons in the keypad component.
 * @const
 */
export const calculatorKeys = [
  { label: 'AC', value: 'AC', type: KeyType.Function },
  { label: '±', value: '+/-', type: KeyType.Function },
  { label: '%', value: '%', type: KeyType.Function },
  { label: '÷', value: '/', type: KeyType.Operator },
  { label: '7', value: '7', type: KeyType.Number },
  { label: '8', value: '8', type: KeyType.Number },
  { label: '9', value: '9', type: KeyType.Number },
  { label: '×', value: '*', type: KeyType.Operator },
  { label: '4', value: '4', type: KeyType.Number },
  { label: '5', value: '5', type: KeyType.Number },
  { label: '6', value: '6', type: KeyType.Number },
  { label: '−', value: '-', type: KeyType.Operator },
  { label: '1', value: '1', type: KeyType.Number },
  { label: '2', value: '2', type: KeyType.Number },
  { label: '3', value: '3', type: KeyType.Number },
  { label: '+', value: '+', type: KeyType.Operator },
  { label: '0', value: '0', type: KeyType.Number, isZero: true },
  { label: '.', value: '.', type: KeyType.Number },
  { label: '=', value: '=', type: KeyType.Operator }
];