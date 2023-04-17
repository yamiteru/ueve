import { sub, Subscriber } from "../src/index.js";
import { eve, pub } from "../src/sync.js";
import { syncSuite } from "./utils/index.js";

const set = new Set<Subscriber<number, false>>();
const event$ = eve<number>();

for (let i = 0; i < 100; ++i) {
  const fn = () => {
    return;
  };

  set.add(fn);
  sub(event$, fn);
}

export const publishSuite = () =>
  syncSuite("publish", {
    set: function () {
      for (const fn of set.values()) {
        fn(1);
      }
    },
    ueve: function () {
      pub(event$, 1);
    },
  });
