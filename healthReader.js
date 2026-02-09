/*
Reads JSON health data asynchronously using fs.readFile
Counts the total number of health entries
Handles errors when the JSON file is missing or invalid
Uses try/catch blocks for proper error handling
*/
function healthMetricsCounter(){
    fs.readFile('healthData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading health data:', err);
            return;
        }
        try {
            const healthData = JSON.parse(data);
            console.log('Total health entries:', healthData.length);
        } catch (parseError) {
            console.error('Error parsing health data:', parseError);
        }
    })};