import { eve, pub, sub } from "../src/sync";

const evenNumbers$ = eve<number>(
	// if the value is even we return it 
	// if not then we return undefined
	(v) => !(v%2) ? v: undefined
);

sub(evenNumbers$, console.log);

for(let i = 0; i < 10; ++i) {
	pub(evenNumbers$, i);
}

// 2
// 4
// 6
// 8
