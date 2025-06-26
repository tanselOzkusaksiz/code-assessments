# Problem One

This is a simple JavaScript application that processes an array of guest objects. Following functional principles, it transforms the data by filtering for guests, flattening the object structure, calculating a total from a nested array, and sorting the results. It is designed to be run in a browser environment and does **not** mutate the original array. For full details, please check the instructions.md file.

In order to run the solution in this branch, follow these steps:

* change directory to ProblemOne

    ```
    cd ProblemOne 
    ```

* install dependencies

    ```
    npm install
    ```

* open the index.html file in your browser

    ```
    open index.html
    ```

> If you want to see the step-by-step logs, set the `traceLogsEnabled` variable to true in the index.js file, otherwise set it to false. Do not forget to open the developer console in your browser to see the logs.


## Running Tests

To run the tests, you can use the following command:

```
npm test
```

and you can see the test results in the console.
```
 processGuestData with initialTestData
    ✓ should correctly process, filter, and sort the array without mutating the original (24 ms)
    ✓ should return an error message for non-array input (3 ms)
    ✓ should return an empty array for an empty input array (3 ms)
    ✓ should include guests even if guest_booking information is missing (4 ms)
    ✓ should correctly sum an empty some_array to 0 (2 ms)
    ✓ should correctly result in a sum of 0 when some_array is missing or not an array (2 ms)
  processGuestData with badStructArr for robustness testing
    ✓ should process mixed and incomplete data gracefully and return only valid guests (4 ms)
    ✓ should correctly handle "guest_type" being non-string types (3 ms)
```