```bash
yarn add ueve # npm install ueve
```

## Concept

μEve is designed to be as low-level and unopinionated as possible so you can build your own abstractions on top of it. 

It supports both sync and async modes. That means you can use sync to solve problems where sync fits the job best and async where async fits the job best.

___

## Performance

There are two aspects of performance that μEve is trying to solve.

#### 1. Runtime performance

This one is obvious. It's what we usually think of when someone says performance.

μEve is just a small wrapper around `Set`. Thanks to that the performance is very close to the native performance of `Set` and its methods.

You can't really go any faster (see [benchmark results](./benchmark.md)).

#### 2. Library size

What people often overlook is the size of a library. There are two major things that make bigger (in kb) libraries slower.

1. When used in a browser the library needs to be downloaded before it can be parsed 
2. No matter where the library is used it needs to get parsed by the JS engine before it can be executed 

μEve is trying to solve these issues by opting out of OOP approach (which many other similar libraries use). In OOP the code for all class methods has to be downloaded and parsed first before it can be executed.

Instead we create a simple object with private properties (with the help of symbols). The object is then passed into all of the methods as the first argument. This makes the methods importable and tree-shakeable.

All of this means that you download and parse only the code that ends up being executed.

___

## Examples

1. [Simple counter](./examples/1-simple-counter.ts)
2. [Input transformation](./examples/2-input-transformation.ts)
3. [Input filtering](./examples/3-input-filtering.ts)
4. [Sync vs Async](./examples/4-sync-vs-async.ts)

___

## API

### `eve`

It creates an event with an optional `Transform` function. 

The `Transform` function is used to transform `I` value from `pub` into a `O` value. 

You can skip the value propagation by returning `undefined` inside the `Transform` function.

There are two versions of this function:
1. Sync imported from `ueve/sync`
2. Async imported from `ueve/async`

In the sync version the `Transform` function is a simple (sync) function. In the async version the `Transform` function is an async function which returns `Promise`.


**This event just passes the input value to subscribers:**

```ts
const message$ = eve<{
	to: string;
	date: Date;
	content: string;
}>();
```

**This one transforms the input value:**

```ts
const click$<[x: number, y: number]>(
	async ([x, y]) => ({ x, y })
);
```

**And this one filters the input value:**

```ts
const login$ = eve<User>(
	async (v) => !(v%2) ? v: undefined
);
```

### `sub`

It adds the `Subscriber` to the event.

It returns `uns` function which deletes the `Subscriber` from the event. 

```ts
const unsub = sub(
	message$, 
	(v) => console.log(`${v.to} -> ${v.content}`)
);

// later in the code
unsub();
```

### `uns`

It deletes the `Subscriber` from the event.

In order to delete the same `Subscriber` you have to keep the reference to the function saved somewere yourself and use it both in `sub` and `uns`.

### `pub`

It uses the `Transform` function to transform the input value and notify all subscribers using this transformed value.

If the `Transform` function returns `undefined` then no subscribers are notified.

There are two versions of this function:
1. Sync imported from `ueve/sync`
2. Async imported from `ueve/async`

In the sync version the `pub` function is a simple sync function. In the async version the `pub` function is an async function which returns `Promise` and has to be awaited.

### `has`

It checks whether the event has the `Subscriber`.

### `clr`

It deletes all subcribers from the event.
