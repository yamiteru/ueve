# μEve

```bash
yarn add ueve # npm install ueve
```

## Example

Let's create a logger which transforms any incoming string to uppercase and counter which publishes `Counter: ${v}` to the logger when the input number is even.

```ts
const logger$ = eve<string>(
	async (v) => v.toUpperCase()
);

const counter$ = eve<number>(
	async (v) => !(v%2) ? v: undefined
); 

const counterToLogger = (v: number) => {
	pub(logger$, `Counter: ${v}`);
}

sub(logger$, console.log);

const unsub = sub(
	counter$, 
	counterToLogger	
);

await pub($counter, 1);
await pub($counter, 2);
await pub($counter, 3);

unsub();

await pub($counter, 4);
await pub($logger, "Last message");

clr($logger);

await pub($logger, "Too late");

if(has($counter, counterToLogger)) {
	console.log("Impossible");
} else {
	console.log("I've seen this coming");
}
``` 

This would be the output inside a console:

```
COUNTER: 2
LAST MESSAGE
I've seen this coming
```

## API

### `eve`

It creates an event with an optional `Transform` argument. The `Transform` function is used to transform input value from `pub` into a different value. You can return `undefined` to not call subscribers. This is useful for filtering or any other selective behavior. 

This event just passes the input value to subscribers:

```ts
const message$ = eve<{
	to: string;
	date: Date;
	content: string;
}>();
```

This one transforms the input value:

```ts
const click$<[x: number, y: number]>(
	async ([x, y]) => ({ x, y })
);
```

And this one filters the input value:

```ts
const login$ = eve<User>(
	async (v) => !(v%2) ? v: undefined
);
```

### `sub`

### `uns`

### `pub`

### `has`

### `clr`
