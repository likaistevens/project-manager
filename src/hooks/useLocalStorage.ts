import { useEffect, useMemo, useState } from "react";

export const useLocalStorage = <
  T = Record<string, string> | string | number | undefined
>(
  key: string,
  data?: T
): [T, (d: T) => void] => {
  const setStorage = (data: T) => {
    if (typeof data === "number" || typeof data === "string") {
      localStorage.setItem(key, data.toString());
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const getStorage = (key: string) => {
    const v = localStorage.getItem(key);
    if (!v) {
      return v;
    }
    let res = undefined;
    try {
      res = JSON.parse(v);
    } catch {
      res = v;
    }
    return res;
  };

  const init = getStorage(key);
  const [value, setValue] = useState<T>(data || init);

  const set = (data: T) => {
    setStorage(data);
    setValue(data);
  };

  //   useEffect(() => {
  //     getStorage(key);
  //   }, [key, value]);

  return [value, set];
};
