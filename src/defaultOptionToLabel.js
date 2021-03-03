export default (item) => {
  if (item === null) return 'Null';
  if (typeof item === 'object') {
    return 'label,name,value,title'.split(',')
      .reduce((label, field) => {
        if (label) return label;
        if (field in item) return item[field];
        return label;
      }, '') || 'Unlabelled';
  }
  return `${item}`;
};
