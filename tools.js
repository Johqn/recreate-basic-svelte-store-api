export const noop = () => {};

export const log = (...p) => {
  if (window.debug) console.log(...p);
};

export const idGenerator = (initId = 0) => {
  let id = initId;

  return {
    getNewId: () => id++
  };
};
