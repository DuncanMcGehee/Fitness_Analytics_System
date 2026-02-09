/*
Reads JSON health data asynchronously using fs.readFile
Counts the total number of health entries
Handles errors when the JSON file is missing or invalid
Uses try/catch blocks for proper error handling
*/
const fs = require('fs');
const path = require('path');

function healthMetricsCounter(filePath = path.join(__dirname, 'data', 'health-metrics.json')) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const healthData = JSON.parse(data);
        const entryCount = Array.isArray(healthData.metrics) ? healthData.metrics.length : 0;
        const user = healthData.user || 'Unknown';
        resolve({ entryCount, user });
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = { healthMetricsCounter };