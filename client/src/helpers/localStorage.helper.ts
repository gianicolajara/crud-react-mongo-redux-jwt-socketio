export const setLocalStorage = (itemName: string, data: any) => {
  if (itemName && data) {
    localStorage.setItem(itemName, JSON.stringify(data));
  }
};

export const getLocalStorage = (itemName: string): any => {
  if (itemName && localStorage.getItem(itemName)) {
    return JSON.parse(localStorage.getItem(itemName) || "");
  }
};

export const deleteLocalStorage = (itemName: string) => {
  if (itemName && localStorage.getItem(itemName)) {
    localStorage.removeItem(itemName);
  }
};
