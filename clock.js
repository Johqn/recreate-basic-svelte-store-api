import { readable } from "./store";
import { log } from "./tools";

const pad = x => String(x).padStart(2, "0");

export const formatTime = date =>
  [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(
    ":"
  );

export const clock = readable(new Date(), set => {
  const interval = setInterval(() => {
    log("tick");
    set(new Date());
  }, 1000);
  return () => {
    log("Clock stopped");
    clearInterval(interval);
  };
});
