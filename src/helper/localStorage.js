

export const updateLocalStorage = (pageKey, key, value) => {
  let storedData = getFromLocalStorage(pageKey) || {};
  storedData[key] = value;
  localStorage.setItem(pageKey, JSON.stringify(storedData));
};

  
export const getFromLocalStorage = (pageKey) => {
  const value = localStorage.getItem(pageKey);
  return value ? JSON.parse(value) : {};
};

  
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  export const clearLocalStorage = () => {
    localStorage.clear();
  };