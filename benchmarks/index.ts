import { writeFile } from "fs/promises";
import { clearSuite } from "./clear.js";
import { hasSuite } from "./has.js";
import { initSuite } from "./init.js";
import { publishSuite } from "./publish.js";
import { subscribeSuite } from "./subscribe.js";
import { unsubscribeSuite } from "./unsubscribe.js";

(async () => {
  await writeFile("./benchmark.md", "");
  await initSuite();
  await subscribeSuite();
  await unsubscribeSuite();
  await publishSuite();
  await hasSuite();
  await clearSuite();
})();
