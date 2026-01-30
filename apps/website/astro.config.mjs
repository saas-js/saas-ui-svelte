import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	site: "https://svelte.saas-ui.dev",
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
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							if (id.includes("@ark-ui") || id.includes("@zag-js"))
								return "ark-vendor";
							if (id.includes("svelte")) return "svelte-vendor";
							if (id.includes("phosphor-svelte")) return "icons";
						}
					},
				},
			},
		},
	},
});
