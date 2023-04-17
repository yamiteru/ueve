import { clr, sub, Subscriber } from "../src/index.js";
import { eve } from "../src/sync.js";
import { syncSuite } from "./utils/index.js";

const set = new Set<Subscriber<number, false>>();
const event$ = eve<number>();

export const clearSuite = () =>
  syncSuite(
    "clear",
    {
      set: function () {
        set.clear();
      },
      ueve: function () {
        clr(event$);
      },
    },
    {
      before: {
        set: () => {
          set.add((v: number) => console.log(v));
        },
        ueve: () => {
          sub(event$, (v: number) => console.log(v));
        },
      },
    },
  );
