import { noop } from "./tools.js";

export const writable = (value, start = noop) => {
  let stop;
  const subscribers = [];

  const set = newValue => {
    value = newValue;
    if (stop) {
      subscribers.forEach(dispatch => dispatch(value));
    }
  };

  const update = fn => set(fn(value));

  const subscribe = dispatch => {
    subscribers.push(dispatch);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    dispatch(value);

    return () => {
      subscribers.splice(subscribers.indexOf(dispatch), 1);
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  };

  return {
    subscribe,
    set,
    update
  };
};

export const readable = (value, start) => ({
  subscribe: writable(value, start).subscribe
});
