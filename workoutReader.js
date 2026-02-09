/*
Uses the csv-parser package to read CSV workout data asynchronously
Counts the total number of workouts in the CSV file
Calculates total workout minutes in the CSV file using a basic for loop
Handles errors when the CSV file is missing or corrupted
Provides clear error messages to users
*/
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function workoutCalculator(filePath = path.join(__dirname, 'data', 'workouts.csv')) {
  return new Promise((resolve, reject) => {
    let totalWorkouts = 0;
    let totalMinutes = 0;

    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        totalWorkouts++;
        const raw = row.duration ?? row.minutes ?? row.duration_minutes ?? '';
        const mins = parseFloat(String(raw).trim());
        if (!Number.isNaN(mins)) totalMinutes += mins;
      })
      .on('end', () => {
        resolve({ totalWorkouts, totalMinutes });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { workoutCalculator };