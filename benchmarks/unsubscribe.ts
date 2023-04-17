import { Lambda, sub, Subscriber, uns } from "../src/index.js";
import { eve } from "../src/sync.js";
import { syncSuite } from "./utils/index.js";

const set = new Set<Subscriber<number, false>>();
const event$ = eve<number>();

let fn: Lambda<number, void>;

export const unsubscribeSuite = () =>
  syncSuite(
    "unsubscribe",
    {
      set: function () {
        set.delete(fn);
      },
      ueve: function () {
        uns(event$, fn);
      },
    },
    {
      beforeEach: () => {
        fn = (v) => console.log(v);
      },
      before: {
        set: () => set.add(fn),
        ueve: () => sub(event$, fn),
      },
    },
  );
