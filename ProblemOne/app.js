// app.js
// This file handles the browser-specific setup and interaction.
// Note that I have separated the logic from the DOM manipulation to keep things clean.
// It assumes that the `processGuestData` function is defined in index.js and is available

$(document).ready(function() {

    const results = processGuestData(arr); // `processGuestData` and `arr` should be available from index.js

    // Display the original array for comparison.
    $('#originalArray').html(JSON.stringify(arr, null, 2));

    // Display the results. If it's an array, format it. If it's an error string, display it directly.
    const resultsHtml = typeof results === 'string'
        ? results
        : JSON.stringify(results, null, 2);
    $('#resultsArray').html(resultsHtml);
});