// TODO: example and test
import { useCallback } from 'react';

import useCounter from './useCounter';
import useInterval from './useInterval';
import useBoolean from './useBoolean';

// interface IN & OUT
interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
  onFinish?(): void;
}
interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}
/**
 * interface with default value
 *
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @param  {?function} countdownOption.onFinish - callback when countdown finish
 * @returns [counter, CountdownControllers]
 */
function useCountdown(countdownOption: CountdownOption): [number, CountdownControllers] {
  const { countStart, intervalMs = 1000, isIncrement = false, countStop = 0, onFinish = () => {} } = countdownOption;

  const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) return onFinish(), stopCountdown();

    if (isIncrement) return increment();
    decrement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown
    }
  ];
}

export default useCountdown;
