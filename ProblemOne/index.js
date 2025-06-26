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

const log = (message, data) => {
  if (traceLogsEnabled) {
    // Use JSON cloning for logs to show immutable state at each step
    // I prefer lodash.clonedeep, but I am not sure if you want me no not include external libraries, as a result I will use JSON methods.
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    console.log(message, data ? deepClone(data) : '');
  }
};

function flattenGuestData(person) {
  const { guest_booking, ...restOfPerson } = person;
  return {
    ...restOfPerson,
    room_no: guest_booking?.room_no ?? 'N/A',
    some_array: guest_booking?.some_array,
  };
};

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

function isGuest(person) {
  return person?.guest_type === 'guest';
}

//#endregion Helper Functions

//#region MAIN WRAPPER FUNCTION

function mutateArray(data) {

  // Input validation: Ensure the provided data is an array.
  if (!Array.isArray(data)) {
    const errorMessage = "Error: Input data is not an array. Cannot process.";
    console.error(errorMessage);
    return errorMessage;
  }

  log("--- Starting Mutation Process ---");
  log("Initial Data:", data);

  // Step 1: Flatten the array
  const flattenedData = data.map(person => flattenGuestData(person));
  log("\nStep 1: After flattening array:", flattenedData);

  // Step 2: Sum the 'some_array' attribute
  const summedData = flattenedData.map(person => sumSomeArray(person));
  log("\nStep 2: After calculating 'some_total':", summedData);

  // Step 3: Filter for guests
  const filteredGuests = summedData.filter(person => isGuest(person));
  log("\nStep 3: After filtering for 'guest' type:", filteredGuests);

  return filteredGuests;
}

//#endregion MAIN WRAPPER FUNCTION

//#region DOM

$(document).ready(function () {
  $('#originalArray').html(JSON.stringify(arr, null, 2));
  $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});

//#endregion DOM