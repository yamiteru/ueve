# μEve

```bash
yarn add ueve # npm install ueve
```

## Concept

μEve is supposed to be used as the building block for any event-driven library or system. 

It was designed to be as low-level and unopiniated as possible so you can build your own abstractions on top of it.

Some problems are best solved in asynchronous manner and some in synchronous manner. This library let's you choose whichever one you want to use.

___

## Performance

Since μEve is designed to be the building block for other libraries it should not be a bottleneck.

There are two aspects of performance that this library is trying to solve.

#### 1. Runtime performance

This one is obvious. It's what we usually think about when someone says performance.

μEve is just a small wrapper around `Set`. That means that the performance is very close to native performance of `Set` and its methods.

You can't really go any faster.

#### 2. Library size

What people often overlook is the size of a library. There are two things that make bigger (in kb) library slower.

1. When used in browser in needs to be downloaded before you can use it and that takes time
2. No matter where it's used it needs to get parsed by the V8 engine before it can be used and that also takes time

μEve is trying to solve that by opting out of OOP approach where the code for all class methods has to be downloaded and parsed first before it can be used which can potentially be very wasteful.

Instead we create a simple object which contains secret variables hidden behind symbols. The object then has to be passed into all methods as the first argument. This makes the methods importable and tree-shakeable.

That means that you download and parse only those methods that you end up using.

___

## Example

Let's create a logger event which transforms any incoming string to uppercase and counter event which publishes `Counter: ${v}` to the logger event when the input number is even.

```ts
const logger$ = eve<string>(
	(v) => v.toUpperCase()
);

const counter$ = eve<number>(
	(v) => !(v%2) ? v: undefined
); 

const counterToLogger = (v: number) => {
	pub(logger$, `Counter: ${v}`);
}

sub(logger$, console.log);

const unsub = sub(
	counter$, 
	counterToLogger	
);

pub($counter, 1);
pub($counter, 2);
pub($counter, 3);

unsub();

pub($counter, 4);
pub($logger, "Last message");

clr($logger);

pub($logger, "Too late");

if(has($counter, counterToLogger)) {
	console.log("Impossible");
} else {
	console.log("I've seen this coming");
}
``` 

This would be the output inside a console:

```txt
COUNTER: 2
LAST MESSAGE
I've seen this coming
```

___

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
