import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// Strip empty Svelte hydration comments from HTML output
const stripSvelteComments = () => ({
	name: "strip-svelte-comments",
	apply: "build",
	transformIndexHtml: {
		order: "post",
		handler: (html) => html.replace(/<!---->/g, ""),
	},
});

export default defineConfig({
	site: "https://svelte.saas-ui.dev",
	integrations: [
		svelte(),
		mdx(),
		sitemap(),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
		}),
	],
	prefetch: true,
	experimental: {
		clientPrerender: true,
	},
	image: {
		service: { entrypoint: "astro/assets/services/sharp" },
	},
	compressHTML: true,
	vite: {
		plugins: [
			tailwindcss(),
			stripSvelteComments(),
			VitePWA({
				registerType: "autoUpdate",
				workbox: {
					globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
					runtimeCaching: [
						{
							urlPattern: ({ request }) => request.destination === "image",
							handler: "CacheFirst",
							options: {
								cacheName: "images",
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 60 * 60 * 24 * 30,
								},
							},
						},
					],
				},
			}),
		],
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
			// Large component library vendors - expected sizes
			chunkSizeWarningLimit: 750,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							if (
								id.includes("@ark-ui") ||
								id.includes("@zag-js")
							)
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
