export default (item) => {
  if (item === null) return null;
  if (typeof item === 'object') {
    return { ...item };
  }
  return item;
};
