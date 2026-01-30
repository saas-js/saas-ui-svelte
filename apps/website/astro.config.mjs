import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	site: "https://saas-js.github.io",
	base: process.env.NODE_ENV === "production" ? "/saas-ui-svelte" : "",
	integrations: [svelte(), mdx()],
	prefetch: true,
	experimental: {
		clientPrerender: true,
	},
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
		optimizeDeps: {
			include: [
				"@ark-ui/svelte",
				"tailwind-variants",
				"tailwind-merge",
				"phosphor-svelte",
			],
		},
		build: {
			target: "esnext",
			minify: "esbuild",
		},
	},
});
