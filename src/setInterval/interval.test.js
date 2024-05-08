// Assuming myInterval is exported from the module where it's defined
const myInterval = require('./setTimeInterval');

// Use Jest to mock timers
jest.useFakeTimers();

describe('myInterval', () => {
    test('calls function at specified intervals', () => {
        const mockFn = jest.fn();
        const intervalTime = 1000; // 1000 milliseconds

        // Start the interval
        const clear = myInterval(mockFn, intervalTime);

        // Fast-forward time by 1000ms
        jest.advanceTimersByTime(intervalTime);
        expect(mockFn).toHaveBeenCalledTimes(1);

        // Fast-forward again to check multiple calls
        jest.advanceTimersByTime(intervalTime * 2); // 2000ms to see two more calls
        expect(mockFn).toHaveBeenCalledTimes(3);

        // Cleanup
        clear();
    });

    test('can be stopped with the returned function', () => {
        const mockFn = jest.fn();
        const intervalTime = 1000;

        // Start the interval
        const clear = myInterval(mockFn, intervalTime);

        // Fast-forward time by 1000ms
        jest.advanceTimersByTime(intervalTime);
        expect(mockFn).toHaveBeenCalledTimes(1);

        // Stop the interval
        clear();

        // Fast-forward again to ensure no more calls
        jest.advanceTimersByTime(intervalTime * 2);
        expect(mockFn).toHaveBeenCalledTimes(1); // Function should not be called again
    });
});