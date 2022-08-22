const formatDate = (miliseconds) => {
  const date = new Date(miliseconds);
  return date.toLocaleDateString('en-US').split('/')[1];
};

export default formatDate;
