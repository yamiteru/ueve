import { writeFile } from "fs/promises";
import { initSuite } from "./init";
import { subscribeSuite } from "./subscribe";

(async () => {
	await writeFile("./benchmark.md", "");
	await initSuite();
	await subscribeSuite();
})();
