import { DependencyList, useCallback, useState } from 'react';

export type AsyncFunc<T> = () => Promise<T>;

export type SuccessAsyncState<T> = [false, undefined, T];

export type ErrorAsyncState = [false, string, undefined];

export type LoadingAsyncState = [true, undefined, undefined];

export type AsyncState<T> = SuccessAsyncState<T> | ErrorAsyncState | LoadingAsyncState;

export type AsyncReturn<T> = [() => void, ...AsyncState<T>, (newValue: T) => void];

export function useAsyncFunc<T>(
  fn: AsyncFunc<T>,
  deps: DependencyList = [],
  initState: AsyncState<T> = [true, undefined, undefined],
): AsyncReturn<T> {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>(initState);
  const newFn = useCallback(() => {
    setAsyncState([true, undefined, undefined]);
    fn()
      .then((value) => {
        setAsyncState([false, undefined, value]);
      })
      .catch((errorString: string) => {
        setAsyncState([false, errorString, undefined]);
      });
  }, deps);
  const setData = (newValue: T) => {
    setAsyncState([false, undefined, newValue]);
  };
  return [newFn, ...asyncState, setData];
}
