require('dotenv').config();
const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

const USER_NAME = process.env.USER_NAME || 'User';
const WEEKLY_GOAL = parseInt(process.env.WEEKLY_GOAL, 10) || 150;

(async () => {
  try {
    console.log(`\n=== Fitness Analytics Summary for ${USER_NAME} ===\n`);

    // Call both functions with async/await
    const workoutData = await workoutCalculator('./data/workouts.csv');
    const healthData = await healthMetricsCounter('./data/health-metrics.json');

    // Display summary
    console.log('Workout Summary:');
    console.log(`Total workouts: ${workoutData.totalWorkouts}`);
    console.log(`Total minutes: ${workoutData.totalMinutes}\n`);

    console.log('Health Metrics Summary:');
    console.log(`Total health entries: ${healthData.entryCount}`);
    console.log(`Health data user: ${healthData.user}\n`);

    // Check if weekly goal met
    const goalMet = workoutData.totalMinutes >= WEEKLY_GOAL;
    const goalStatus = goalMet ? 'GOAL MET!' : 'Goal not met yet';
    console.log(`Weekly Goal Status:`);
    console.log(`Goal: ${WEEKLY_GOAL} minutes`);
    console.log(`Achieved: ${workoutData.totalMinutes} minutes`);
    console.log(`${goalStatus}\n`);

    if (!goalMet) {
      const remaining = WEEKLY_GOAL - workoutData.totalMinutes;
      console.log(`Tip: You need ${remaining} more minutes to reach your weekly goal!\n`);
    }

  } catch (error) {
    console.error('Error processing fitness data:');
    console.error(`${error.message}`);
    console.error('\nPlease check that the data files exist and are properly formatted.');
    process.exit(1);
  }
})();
