const { workoutCalculator } = require('../workoutReader');
const path = require('path');

describe('workoutCalculator', () => {
  const validCsvPath = path.join(__dirname, '../data/workouts.csv');
  const invalidCsvPath = path.join(__dirname, '../data/nonexistent.csv');

  describe('Valid CSV file reading', () => {
    test('should successfully read and parse valid CSV file', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    test('should return object with totalWorkouts property', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result).toHaveProperty('totalWorkouts');
      expect(typeof result.totalWorkouts).toBe('number');
    });

    test('should return object with totalMinutes property', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result).toHaveProperty('totalMinutes');
      expect(typeof result.totalMinutes).toBe('number');
    });

    test('should return correct data structure', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result).toEqual({
        totalWorkouts: expect.any(Number),
        totalMinutes: expect.any(Number)
      });
    });

    test('should have totalWorkouts greater than 0', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result.totalWorkouts).toBeGreaterThan(0);
    });

    test('should have totalMinutes greater than 0', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result.totalMinutes).toBeGreaterThan(0);
    });

    test('should calculate correct total minutes (330)', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result.totalMinutes).toBe(330);
    });

    test('should count correct number of workouts (10)', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result.totalWorkouts).toBe(10);
    });
  });

  describe('Error handling for missing files', () => {
    test('should reject promise when CSV file does not exist', async () => {
      await expect(workoutCalculator(invalidCsvPath)).rejects.toThrow();
    });

    test('should reject with specific error message', async () => {
      await expect(workoutCalculator(invalidCsvPath)).rejects.toThrow('File not found');
    });

    test('should not return data when file is missing', async () => {
      let resolved = false;
      try {
        await workoutCalculator(invalidCsvPath);
        resolved = true;
      } catch (err) {
        expect(resolved).toBe(false);
      }
    });
  });

  describe('Default file path', () => {
    test('should use default data/workouts.csv when no path provided', async () => {
      const result = await workoutCalculator(validCsvPath);
      expect(result).toBeDefined();
      expect(result.totalWorkouts).toBeGreaterThan(0);
    });
  });
});