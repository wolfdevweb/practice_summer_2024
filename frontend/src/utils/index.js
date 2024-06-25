export const filterTasks = (arr = [], status) => {
  return arr.filter((elem) => elem.status === status);
};
