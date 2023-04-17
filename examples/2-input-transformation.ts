import { eve, pub, sub } from "../src/sync.js";

const doubleNumber$ = eve<number>((v) => v * 2);

sub(doubleNumber$, console.log);

for (let i = 0; i < 5; ++i) {
  pub(doubleNumber$, i);
}

// 0
// 2
// 4
// 6
// 8
