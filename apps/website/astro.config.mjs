import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	site: "https://saas-js.github.io",
	base: "/saas-ui-svelte",
	integrations: [svelte()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				$saas: path.resolve("../../packages/saas-svelte"),
			},
		},
	},
});
