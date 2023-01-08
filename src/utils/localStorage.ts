export const getFromLocalStorage = (key: string): string | null => {
   const value = localStorage.getItem(key);
   return value ? value : null;
}

export const setToLocalStorage = (params: {key: string, value: string}): void  => {
   const {key, value} = params;
   localStorage.setItem(key, value);
}

export const deleteFromLocalStorage = (key: string): void => {
   localStorage.removeItem(key)
}