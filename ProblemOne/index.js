// index.js
// This file contains the main logic for processing an array of guest data.

//#region Variables

var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
      'room_no': 'A0073',
      'some_array': [7, 2, 4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
      'room_no': 'C73',
      'some_array': [1, 3, 5, 2, 4, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
      'room_no': 'B15',
      'some_array': [2, 5, 6, 3]
    },
  },
];
// Set to true to see step-by-step logs in the console, false to disable.
const traceLogsEnabled = true;

//#endregion Variables



//#region Helper Functions

/**
 * A utility for conditional logging based on the traceLogsEnabled flag.
 * Clones data to prevent logging mutated objects by reference.
 * @param {string} message - The message to log.
 * @param {*} [data] - Optional data to log. It will be deep-cloned.
 */
function log(message, data) {
  if (traceLogsEnabled) {
    // Using JSON for cloning is a lightweight way to show immutable state at each step.
    // It works well for JSON-compatible data (no Dates, Functions, undefined, etc.).
    // For more complex objects, a library like lodash.clonedeep would be more robust.
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    console.log(message, data ? deepClone(data) : '');
  }
};

/**
 * A pure function to flatten the guest data structure.
 * @param {object} person - The original person object.
 * @returns {object} - A new object with a flattened structure.
 */
function flattenGuestData(person) {
  const { guest_booking, ...restOfPerson } = person;
  return {
    ...restOfPerson,
    room_no: guest_booking?.room_no ?? 'N/A',
    some_array: guest_booking?.some_array,
  };
};

/**
 * A pure function to calculate the sum of 'some_array' and replace it with 'some_total'.
 * @param {object} person - The person object with a 'some_array' property.
 * @returns {object} - A new object with 'some_total' instead of 'some_array'.
 */
function sumSomeArray(person) {
  const { some_array, ...restOfPerson } = person;
  const sum = Array.isArray(some_array)
    ? some_array.reduce((total, current) => {
      // Ensure only numbers are added. If 'current' is not a number, add 0.
      return total + (typeof current === 'number' ? current : 0);
    }, 0)
    : 0;
  return {
    ...restOfPerson,
    some_total: sum,
  };
};

/**
 * A pure function that checks if a person is a guest.
 * Safely handles cases where person or guest_type might be missing.
 * @param {object} person - The person object to check.
 * @returns {boolean} - True if the person is a guest, false otherwise.
 */
function isGuest(person) {
  return person?.guest_type === 'guest';
}

/**
 * A pure comparator function to sort guests alphabetically by last name, then first name.
 * Uses `localeCompare` for robust string comparison.
 * Safely handles cases where names are missing.
 * @param {object} a - The first guest object.
 * @param {object} b - The second guest object.
 * @returns {number} - A negative, zero, or positive value for sorting.
 */
function sortByName(a, b) {
  // Default to empty strings if names are null or undefined
  const lastNameA = a.last_name ?? '';
  const lastNameB = b.last_name ?? '';
  const firstNameA = a.first_name ?? '';
  const firstNameB = b.first_name ?? '';

  // Sort by last name. If they are the same, sort by first name.
  return lastNameA.localeCompare(lastNameB) || firstNameA.localeCompare(firstNameB);
}

//#endregion Helper Functions

//#region MAIN WRAPPER FUNCTION

/**
 * Processes the guest array by transforming, filtering, and sorting the data.
 * This function is a pipeline that composes the pure helper functions.
 * It does not modify the original array, instead returning a new one.
 * @param {Array<object>} data - The original array of guest data.
 * @returns {Array<object>|string} - The new, processed array of guest data, or an error message string.
 */
// IMPROVEMENT: Renamed function from `mutateArray` to `processGuestData` to accurately reflect
// that it does NOT mutate the original array.
function processGuestData(data) {

  // Input validation: Ensure the provided data is an array.
  if (!Array.isArray(data)) {
    const errorMessage = "Error: Input data is not an array. Cannot process.";
    console.error(errorMessage);
    return errorMessage;
  }

  log("--- Starting Processing ---");
  log("Initial Data:", data);

  // Step 1: Flatten the array
  const flattenedData = data.map(flattenGuestData);
  log("\nStep 1: After flattening array:", flattenedData);

  // Step 2: Sum the 'some_array' attribute
  const summedData = flattenedData.map(sumSomeArray);
  log("\nStep 2: After calculating 'some_total':", summedData);

  // Step 3: Filter for guests
  const filteredGuests = summedData.filter(isGuest);
  log("\nStep 3: After filtering for 'guest' type:", filteredGuests);

  // Step 4: Sort alphabetically
  // IMPROVEMENT: Removed redundant spread operator `[...]`. The `.filter()` method
  // already returns a new array, so we can safely call `.sort()` on it directly.
  const sortedData = filteredGuests.sort(sortByName);
  log("\nStep 4: After sorting by name (Final Result):", sortedData);
  log("\n--- Processing Complete ---");

  return sortedData;

  // IMPROVEMENT: Removed unreachable code that was here.
}

//#endregion MAIN WRAPPER FUNCTION

//#region DOM

$(document).ready(function () {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  // Call the renamed function
  $('#resultsArray').html(JSON.stringify(processGuestData(arr), null, 2));
});

//#endregion DOM