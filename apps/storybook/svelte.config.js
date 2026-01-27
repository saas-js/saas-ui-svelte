import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-auto";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$saas: path.resolve("../../packages/saas-svelte"),
			"$saas/*": path.resolve("../../packages/saas-svelte/*"),
		},
	},
};

export default config;
