import { S, T} from "./constants";

export type Either<L, R> = L | R;

export type Nullable<T> = Either<null, T>;

export type Lambda<I, O> = (value: I) => Promise<O>;

export type Subscriber<T> = Lambda<T, void>;

export type Subscribers<T> = Set<Subscriber<T>>;

export type Transform<I, O> = Lambda<I, O>;

export type EventEmitter<I, O> = {
  [S]: Nullable<Subscribers<O>>;
  [T]: Transform<I, O>;
};
