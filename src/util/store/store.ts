import { useEffect, useState } from 'react';

export type Func<Data> = (newData: Data) => void;

export interface FuncItem<Data> {
  func: Func<Data>;
  flag: number;
}

export function createStore<Data>(
  data: Data,
): [() => Data, (newFunc: Func<Data>) => number, (newData: Data) => void, (flag: number) => void] {
  let thisData: Data = data;
  let changeFuncCount = 0;
  let changeDataList: FuncItem<Data>[] = [];
  const addWatchFunc = (newFunc: Func<Data>): number => {
    changeDataList.push({
      func: newFunc,
      flag: changeFuncCount,
    });
    changeFuncCount++;
    return changeFuncCount - 1;
  };
  const setData = (newData: Data): void => {
    if (thisData !== newData) {
      thisData = newData;
      changeDataList.forEach((value) => {
        value.func(thisData);
      });
    }
  };
  const removeWatchFunc = (flag: number): void => {
    changeDataList = changeDataList.filter((value) => {
      return value.flag !== flag;
    });
  };
  const getData = (): Data => {
    return thisData;
  };
  return [getData, addWatchFunc, setData, removeWatchFunc];
}

export function createUseStoreFunc<Data>(data: Data): () => [Data, (newData: Data) => void] {
  const [getData, addWatchFunc, setData, removeWatchFunc] = createStore<Data>(data);
  const useStore = (): [Data, (newData: Data) => void] => {
    const [value, setValue] = useState<Data>(getData());
    useEffect(() => {
      const flag = addWatchFunc((newData) => {
        setValue(newData);
      });
      return () => {
        removeWatchFunc(flag);
      };
    }, []);
    return [value, setData];
  };
  return useStore;
}

// export function useStore<Data>(
//   getData: () => Data,
//   addWatch: (newFunc: Func<Data>) => number,
//   setData: (newData: Data) => void,
//   removeWatch: (flag: number) => void,
// ): [Data, (newData: Data) => void] {
//   const [value, setValue] = useState<Data>(getData());
//   useEffect(() => {
//     const flag = addWatch((newData) => {
//       setValue(newData);
//     });
//     return () => {
//       removeWatch(flag);
//     };
//   }, [addWatch, removeWatch]);
//   return [value, setData];
// }
