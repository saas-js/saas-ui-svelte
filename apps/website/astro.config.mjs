import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	site: "https://saas-js.github.io",
	base: process.env.NODE_ENV === "production" ? "/saas-ui-svelte" : "",
	integrations: [svelte(), react(), mdx()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				$saas: path.resolve("../../packages/saas-svelte"),
				$demos: path.resolve("../../packages/saas-svelte/demos"),
				$lib: path.resolve("./src/lib"),
				$stories: path.resolve("../storybook/stories"),
				$wrappers: path.resolve("../storybook/stories/wrappers"),
			},
		},
	},
});
