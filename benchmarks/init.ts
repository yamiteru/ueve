import { eve } from "../src/sync";
import { syncSuite } from "./utils";

export const initSuite = () => syncSuite("init", {
	set: function() {
		const set = new Set();
	},
	ueve: function() { 
		const event$ = eve(); 
	}
});
