import { S, T } from "./constants";

export type Either<L, R> = L | R;

export type Nullable<T> = Either<null, T>;

export type Lambda<I, O> = (value: I) => O;

export type Subscriber<T, Async extends boolean> = Lambda<
  T,
  Async extends true ? PromiseLike<void> : void
>;

export type Subscribers<T, Async extends boolean> = Set<Subscriber<T, Async>>;

export type Transform<I, O> = Lambda<I, O>;

export type EventSync<I, O> = (transform?: Transform<I, O>) => {
  [S]: Nullable<Subscribers<O, false>>;
  [T]: Transform<I, O>;
};

export type EventAsync<I, O> = (transform?: Transform<I, PromiseLike<O>>) => {
  [S]: Nullable<Subscribers<O, true>>;
  [T]: Transform<I, PromiseLike<O>>;
};

export type EventAny<I = any, O = any> = Either<
  EventSync<I, O>,
  EventAsync<I, O>
>;

export type InferSubscriber<T extends EventAny<any, any>> =
  T extends EventAsync<any, infer O>
    ? Subscriber<O, true>
    : T extends EventSync<any, infer O>
    ? Subscriber<O, false>
    : never;
