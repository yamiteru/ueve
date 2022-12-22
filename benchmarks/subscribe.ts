import { eve, Lambda, sub } from "../src/sync";
import { syncSuite } from "./utils";

const set = new Set<Lambda<number, void>>();
const event$ = eve<number>();

export const subscribeSuite = () => syncSuite("subscribe", {
	set: function() {
		set.add((v) => console.log(v));
	},
	ueve: function() {
		sub(event$, (v) => console.log(v));	
	}
});
