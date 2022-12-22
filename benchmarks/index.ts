import { writeFile } from "fs/promises";
import { clearSuite } from "./clear";
import { hasSuite } from "./has";
import { initSuite } from "./init";
import { publishSuite } from "./publish";
import { subscribeSuite } from "./subscribe";
import { unsubscribeSuite } from "./unsubscribe";

(async () => {
  await writeFile("./benchmark.md", "");
  await initSuite();
  await subscribeSuite();
  await unsubscribeSuite();
  await publishSuite();
  await hasSuite();
  await clearSuite();
})();
