import { clr, eve, Lambda, sub } from "../src/sync.js";
import { syncSuite } from "./utils/index.js";

const set = new Set<Lambda<number, void>>();
const event$ = eve<number>();

let fn: Lambda<number, void>;

export const subscribeSuite = () =>
  syncSuite(
    "subscribe",
    {
      set: function () {
        set.add(fn);
      },
      ueve: function () {
        sub(event$, fn);
      },
    },
    {
      beforeEach: () => {
        fn = (v) => console.log(v);
      },
      after: {
        set: () => set.clear(),
        ueve: () => clr(event$),
      },
    },
  );
