import { S, T } from "../private/constants";

export type Either<L, R> = L | R;

export type Nullable<T> = Either<null, T>;

export type Lambda<I, O> = (value: I) => O;

export type Subscriber<
	T, 
	Async extends boolean
> = Lambda<
	T, 
	Async extends true 
		? PromiseLike<void>
		: void
>;

export type Subscribers<
	T,
	Async extends boolean
> = Set<Subscriber<T, Async>>;

export type Transform<I, O> = Lambda<I, O>;

export type EventSync<I, O> = (
	transform?: Transform<I, O>
) => {
	[S]: Nullable<Subscribers<O, false>>;
	[T]: Transform<I, O>
};

export type EventAsync<I, O> = (
	transform?: Transform<I, PromiseLike<O>>
) => {
	[S]: Nullable<Subscribers<O, true>>;
	[T]: Transform<I, PromiseLike<O>>
};

export type EventAny<
	I = unknown, 
	O = unknown
> = Either<
	EventSync<I, O>,
	EventAsync<I, O>
>;

export type InferSubscriber<
	T extends EventAny<unknown, unknown>
> = T extends EventAsync<unknown, infer O>
	? Subscriber<O, true>
	: T extends EventSync<unknown, infer O>
		? Subscriber<O, false>
		: never;
