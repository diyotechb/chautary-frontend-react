export const getFromLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key);
  if (!value) return value;
  return typeof value === "object" ? JSON.parse(value) : value;
};

export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value,
  );
};
