/*
Uses the csv-parser package to read CSV workout data asynchronously
Counts the total number of workouts in the CSV file
Calculates total workout minutes in the CSV file using a basic for loop
Handles errors when the CSV file is missing or corrupted
Provides clear error messages to users
*/

const fs = require('fs');
const csv = require('csv-parser');
let totalWorkouts = 0;
let totalMinutes = 0;
fs.createReadStream('workoutData.csv')
    .pipe(csv())
    .on('data', (row) => {
        totalWorkouts++;
        totalMinutes += parseInt(row.minutes, 10);
    })
    .on('end', () => {
        console.log('Total workouts:', totalWorkouts);
        console.log('Total workout minutes:', totalMinutes);
    })
    .on('error', (err) => {
        console.error('Error reading workout data:', err);
    });