// index.test.js

// Import the functions to be tested from index.js
const {
  processGuestData,
} = require('./index');


// The original array structure for testing purposes.
// A fresh copy is made before each test.
const initialTestData = [
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


// A separate data set with messy and incomplete data for robustness testing.
const badStructArr = [
  // This entry is not a guest and will be filtered out.
  { a: 1, b: 2, c: 3 },
  // This entry has an invalid guest_type and will be filtered out.
  {
    'guest_type': ['crew', 'guest'],
    'first_name': 'Marco',
    'last_name': 'InvalidType',
    'guest_booking': [{ 'room_no': 'A0073', 'some_array': [7, 2, 4] }],
  },
  // This is a crew member and will be filtered out.
  {
    'guest_type': 'crew',
    'first_name': 'Marco', 'last_name': 'Burns',
    'guest_booking': { 'room_no': 'A0073', 'some_array': [7, 2, 4] },
  },
  // Valid guest entries that should be processed.
  {
    'guest_type': 'guest',
    'first_name': 'John', 'last_name': 'Doe',
    'guest_booking': { 'room_no': 'C73', 'some_array': [1, 3, 5, 2, 4, 3] },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane', 'last_name': 'Doe',
    'guest_booking': { 'room_no': 'C73', 'some_array': [1, 3, 5, 2, 4, 3] },
  },
  // A guest with a missing last_name. Should be handled gracefully.
  {
    'guest_type': 'guest',
    'first_name': 'Albert', // last_name is missing
    'guest_booking': { 'room_no': 'B15', 'some_array': [2, 5, 6, 3] },
  },
  // A guest with missing guest_booking. Should be handled gracefully.
  {
    'guest_type': 'guest',
    'first_name': 'Alan', 'last_name': 'Turing', // guest_booking is missing
  },
  // A guest with an empty guest_booking object.
  {
    'guest_type': 'guest',
    'first_name': 'EmptyBooking', 'last_name': 'Guest',
    'guest_booking': {}
  },
  // A guest with a null some_array.
  {
    'guest_type': 'guest',
    'first_name': 'NullArray', 'last_name': 'Guest',
    'guest_booking': { 'room_no': 'N01', 'some_array': null }
  },
  // A guest with non-numeric values in some_array.
  {
    'guest_type': 'guest',
    'first_name': 'MixedArray', 'last_name': 'Guest',
    'guest_booking': { 'room_no': 'M01', 'some_array': [1, 'a', 2, null, 3] }
  },
];


describe('processGuestData with initialTestData', () => {

  let originalArrCopy;

  beforeEach(() => {
    // Create a deep copy of the test data before each test to ensure isolation.
    originalArrCopy = JSON.parse(JSON.stringify(initialTestData));
  });

  // THIS IS THE CORRECTED TEST
  it('should correctly process, filter, and sort the array without mutating the original', () => {
    const processedArray = processGuestData(originalArrCopy);

    // There are 4 guests in the initial test data.
    expect(processedArray.length).toBe(4);

    // The sorting is by last_name, then first_name.
    // The correct order is: Doe (Jane), Doe (John), Einstein (Albert), Turing (Alan).

    // 1. Jane Doe
    expect(processedArray[0]).toEqual(expect.objectContaining({
      first_name: 'Jane',
      last_name: 'Doe',
      room_no: 'C73',
      some_total: 18,
      guest_type: 'guest'
    }));

    // 2. John Doe
    expect(processedArray[1]).toEqual(expect.objectContaining({
      first_name: 'John',
      last_name: 'Doe',
      room_no: 'C73',
      some_total: 18,
      guest_type: 'guest'
    }));

    // 3. Albert Einstein
    expect(processedArray[2]).toEqual(expect.objectContaining({
      first_name: 'Albert',
      last_name: 'Einstein',
      room_no: 'B15',
      some_total: 16,
      guest_type: 'guest'
    }));

    // 4. Alan Turing
    expect(processedArray[3]).toEqual(expect.objectContaining({
      first_name: 'Alan',
      last_name: 'Turing',
      room_no: 'B15',
      some_total: 16, // Corrected from 0, as this guest shares a booking in the initial data
      guest_type: 'guest'
    }));

    // Verify that the 'some_array' property was removed in all processed objects.
    processedArray.forEach(guest => {
      expect(guest.some_array).toBeUndefined();
    });

    // Crucially, ensure the original array was not mutated.
    expect(originalArrCopy).toEqual(initialTestData);
  });

  it('should return an error message for non-array input', () => {
    const result = processGuestData("this is not an array");
    expect(result).toBe("Error: Input data is not an array. Cannot process.");
  });

  it('should return an empty array for an empty input array', () => {
    const result = processGuestData([]);
    expect(result).toEqual([]);
  });

  it('should include guests even if guest_booking information is missing', () => {
    const customArr = [
      { 'guest_type': 'guest', 'first_name': 'Valid', 'last_name': 'Guest', 'guest_booking': { 'room_no': 'T1', 'some_array': [1] } },
      { 'guest_type': 'guest', 'first_name': 'NoBooking', 'last_name': 'Guest' /* missing guest_booking */ },
    ];
    const processed = processGuestData(customArr);
    expect(processed.length).toBe(2);

    // Check for the guest that had no booking info.
    expect(processed[0]).toEqual(expect.objectContaining({
      first_name: 'NoBooking',
      room_no: 'N/A',
      some_total: 0,
    }));
    // Check for the valid guest.
    expect(processed[1]).toEqual(expect.objectContaining({
      first_name: 'Valid',
      room_no: 'T1',
      some_total: 1,
    }));
  });

  it('should correctly sum an empty some_array to 0', () => {
    const customArr = [
      { 'guest_type': 'guest', 'first_name': 'Empty', 'last_name': 'Array', 'guest_booking': { 'room_no': 'E1', 'some_array': [] } },
    ];
    const processed = processGuestData(customArr);
    expect(processed[0].some_total).toBe(0);
  });

  it('should correctly result in a sum of 0 when some_array is missing or not an array', () => {
    const customArr = [
      { 'guest_type': 'guest', 'first_name': 'Missing', 'last_name': 'Array', 'guest_booking': { 'room_no': 'M1' } },
      { 'guest_type': 'guest', 'first_name': 'Invalid', 'last_name': 'ArrayType', 'guest_booking': { 'room_no': 'I1', 'some_array': 'not an array' } },
    ];
    const processed = processGuestData(customArr);
    expect(processed.length).toBe(2);
    expect(processed[0].some_total).toBe(0); // Sorted 'Array'
    expect(processed[1].some_total).toBe(0); // Sorted 'ArrayType'
  });
});

describe('processGuestData with badStructArr for robustness testing', () => {

  it('should process mixed and incomplete data gracefully and return only valid guests', () => {
    const processedArray = processGuestData(badStructArr);

    // Count valid guests from badStructArr:
    // John Doe, Jane Doe, Albert (no last name), Alan Turing (no booking),
    // EmptyBooking, NullArray, MixedArray
    // Total = 7 guests
    expect(processedArray.length).toBe(7);

    // Assert correct sorting and processing for the valid guests.
    // Order: Albert (no last_name), Jane Doe, John Doe, EmptyBooking Guest, MixedArray Guest, NullArray Guest, Alan Turing
    expect(processedArray[0]).toEqual(expect.objectContaining({ first_name: 'Albert', room_no: 'B15', some_total: 16 }));
    expect(processedArray[1]).toEqual(expect.objectContaining({ first_name: 'Jane', last_name: 'Doe', room_no: 'C73', some_total: 18 }));
    expect(processedArray[2]).toEqual(expect.objectContaining({ first_name: 'John', last_name: 'Doe', room_no: 'C73', some_total: 18 }));
    expect(processedArray[3]).toEqual(expect.objectContaining({ first_name: 'EmptyBooking', last_name: 'Guest', room_no: 'N/A', some_total: 0 }));
    expect(processedArray[4]).toEqual(expect.objectContaining({ first_name: 'MixedArray', last_name: 'Guest', room_no: 'M01', some_total: 6 })); // 1 + 2 + 3 = 6
    expect(processedArray[5]).toEqual(expect.objectContaining({ first_name: 'NullArray', last_name: 'Guest', room_no: 'N01', some_total: 0 }));
    expect(processedArray[6]).toEqual(expect.objectContaining({ first_name: 'Alan', last_name: 'Turing', room_no: 'N/A', some_total: 0 }));

  });

  it('should correctly handle "guest_type" being non-string types', () => {
    const invalidGuestTypeArr = [
      { 'guest_type': ['guest'], 'first_name': 'ArrayType', 'last_name': 'Guest' },
      { 'guest_type': null, 'first_name': 'NullType', 'last_name': 'Guest' },
      { 'guest_type': 123, 'first_name': 'NumberType', 'last_name': 'Guest' },
      { 'guest_type': 'guest', 'first_name': 'Valid', 'last_name': 'Guest', 'guest_booking': { 'room_no': 'V1', 'some_array': [4] } },
    ];

    const processed = processGuestData(invalidGuestTypeArr);
    // Only the one entry with guest_type === 'guest' should pass the filter.
    expect(processed.length).toBe(1);
    expect(processed[0].first_name).toBe('Valid');
  });
});
