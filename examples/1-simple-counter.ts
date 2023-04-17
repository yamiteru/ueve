import { clr, eve, pub, sub } from "../src/sync.js";

// create event emitter
const counter = eve<number>();

// subscribe to the event
sub(counter, (v) => console.log(`COUNT: ${v}`));

// publish values to the event
for (let i = 0; i < 10; ++i) {
  pub(counter, i);
}

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

// clear all subscribers
clr(counter);
