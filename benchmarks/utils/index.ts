import { appendFile } from "fs/promises";
import { Either } from "../../src/types";

type Result = { 
	name: string;
	ms: number;
	se: number;
	op: number;
};

type Options = {
	async: boolean;
	iterations: number;
	runs: number;
};

type InferFunctions<
	T extends Either<undefined, boolean>
> = { 
	[fn: string]: T extends true 
		? () => Promise<void>
		: () => void
};

const OPTIONS: Options = {
	async: false,
	iterations: 100_000,
	runs: 100
};

export const suite = <T extends Partial<Options>>(
	options?: T
) => {
	const mergedOptions = {
		...OPTIONS,
		...options
	};

	return async (
		name: string,
		fns: InferFunctions<T["async"]>,
	) => {
		const results: Result[] = [];

		for(const name in fns) {
			const fn = fns[name];
			const runs: bigint[] = [];

			for(let i = 0; i < mergedOptions.runs; ++i) {
				const start = process.hrtime.bigint();

				for(let j = 0; j < mergedOptions.iterations; ++j) {
					fn();	
				}	

				runs.push(process.hrtime.bigint() - start);
			}
			
			const ms = Number(runs.sort((a, b) => a === b ? 0: +(a<b))[!(mergedOptions.runs%2) 
				? mergedOptions.runs/2-1 
				: Math.floor(mergedOptions.runs/2)]) / 1_000_000;
			const se = ms / 1_000;
			const op = Math.round((1 / se) * mergedOptions.iterations);

			results.push({
				name, ms, se, op 
			});
		}

		await appendFile(
			"benchmark.md", 
			`# ${name}` 
			+ "\n\n" 
			+ "Name | Op/s" 
			+ "\n" 
			+ "---|---" 
			+ "\n"
			+ results
				.sort((a, b) => b.op - a.op)
				.map(({name, op}) => `${name} | ${op.toLocaleString("en")}`)
				.join("\n")
			+ "\n\n"
		);	
	};
}

export const syncSuite = suite({ async: false });
export const asyncSuite = suite({ async: true });
