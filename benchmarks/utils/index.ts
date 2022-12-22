import { appendFile } from "fs/promises";
import { Either } from "../../src/types";

type Result = {
  name: string;
  op: number;
};

type Options = {
  async: boolean;
  iterations: number;
  runs: number;
};

type Hooks = {
  beforeEach: () => void;
  afterEach: () => void;
  before: Record<string, () => void>;
  after: Record<string, () => void>;
};

type InferFunctions<T extends Either<undefined, boolean>> = {
  [fn: string]: T extends true ? () => Promise<void> : () => void;
};

const DEV = false;

const OPTIONS: Options = {
  async: false,
  iterations: DEV ? 1_000 : 1_000_000,
  runs: DEV ? 10 : 100,
};

const descending = <T extends Either<number, bigint>>(a: T, b: T) =>
  a === b ? 0 : +(a < b);

const getMiddleItem = <T extends unknown[]>(array: T): T[number] => {
  const length = array.length;

  return array[!(length % 2) ? length / 2 - 1 : Math.floor(length / 2)];
};

const median = <T extends (number | bigint)[]>(array: T) =>
  getMiddleItem(array.sort(descending));

export const suite = <T extends Partial<Options>>(options?: T) => {
  const mergedOptions = {
    ...OPTIONS,
    ...options,
  };

  return async (
    name: string,
    fns: InferFunctions<T["async"]>,
    hooks?: Partial<Hooks>,
  ) => {
    console.log(`### ${name}`);
    const results: Result[] = [];

    for (const name in fns) {
      console.log(name);
      const fn = fns[name];
      const cpus: bigint[] = [];

      for (let i = 0; i < mergedOptions.runs; ++i) {
        let cpu = BigInt(0);

        for (let j = 0; j < mergedOptions.iterations; ++j) {
          hooks?.beforeEach?.();
          hooks?.before?.[name]?.();

          const start = process.hrtime.bigint();

          fn();

          cpu += process.hrtime.bigint() - start;

          hooks?.after?.[name]?.();
          hooks?.afterEach?.();
        }

        cpus.push(cpu);
      }

      const op = Math.round(
        (1 / (Number(median(cpus)) / 1_000_000 / 1_000)) *
          mergedOptions.iterations,
      );

      results.push({
        name,
        op,
      });
    }

    await appendFile(
      "benchmark.md",
      `# ${name}` +
        "\n\n" +
        "Name | Op/s  " +
        "\n" +
        "---|---|---  " +
        "\n" +
        results
          .sort((a, b) => b.op - a.op)
          .map(({ name, op }) => `${name} | ${op.toLocaleString("en")}  `)
          .join("\n") +
        "\n\n",
    );
  };
};

export const syncSuite = suite({ async: false });
export const asyncSuite = suite({ async: true });
