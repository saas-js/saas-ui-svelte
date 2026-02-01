import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { FontaineTransform } from "fontaine";
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Strip empty Svelte hydration comments from HTML output
function stripSvelteComments() {
	return {
		name: "strip-svelte-comments",
		hooks: {
			"astro:build:done": async ({ dir }) => {
				const outDir = fileURLToPath(dir);
				const htmlFiles = [];

				// Recursively find all HTML files
				function findHtmlFiles(directory) {
					const entries = fs.readdirSync(directory, {
						withFileTypes: true,
					});
					for (const entry of entries) {
						const fullPath = path.join(directory, entry.name);
						if (entry.isDirectory()) {
							findHtmlFiles(fullPath);
						} else if (entry.name.endsWith(".html")) {
							htmlFiles.push(fullPath);
						}
					}
				}

				findHtmlFiles(outDir);

				// Strip comments from each HTML file
				for (const file of htmlFiles) {
					const content = fs.readFileSync(file, "utf-8");
					const stripped = content.replace(/<!---->/g, "");
					if (content !== stripped) {
						fs.writeFileSync(file, stripped);
					}
				}

				console.log(
					`Stripped Svelte comments from ${htmlFiles.length} HTML files`,
				);
			},
		},
	};
}

export default defineConfig({
	site: "https://svelte.saas-ui.dev",
	integrations: [
		svelte(),
		mdx(),
		sitemap(),
		robotsTxt({
			policy: [{ userAgent: "*", allow: "/" }],
		}),
		stripSvelteComments(),
	],
	prefetch: true,
	experimental: {
		clientPrerender: true,
	},
	image: {
		service: { entrypoint: "astro/assets/services/sharp" },
	},
	compressHTML: true,
	// Inline small stylesheets to reduce blocking requests
	inlineStylesheets: "auto",
	vite: {
		plugins: [
			sveltePhosphorOptimize(),
			tailwindcss(),
			FontaineTransform.vite({
				fallbacks: [
					"Arial",
					"Helvetica Neue",
					"Helvetica",
					"sans-serif",
				],
				resolvePath: (id) =>
					new URL(`./node_modules/${id}`, import.meta.url),
			}),
			VitePWA({
				registerType: "autoUpdate",
				workbox: {
					globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
					runtimeCaching: [
						{
							urlPattern: ({ request }) =>
								request.destination === "image",
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
				"tailwind-variants",
				"tailwind-merge",
				"chart.js",
				"@tanstack/svelte-virtual",
				"clsx",
			],
		},
		build: {
			target: "esnext",
			minify: "esbuild",
			cssMinify: "esbuild",
			cssCodeSplit: true,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// Vendor chunks
						if (id.includes("node_modules")) {
							// phosphor-svelte icons are tree-shaken by sveltePhosphorOptimize plugin
							if (id.includes("phosphor-svelte"))
								return undefined;
							if (
								id.includes("@ark-ui") ||
								id.includes("@zag-js")
							)
								return "ark-vendor";
							if (id.includes("svelte")) return "svelte-vendor";
							// Group other common dependencies
							if (
								id.includes("tailwind-merge") ||
								id.includes("tailwind-variants") ||
								id.includes("clsx")
							)
								return "tw-utils";
						}

						// Consolidate saas-svelte into fewer chunks
						if (
							id.includes("saas-svelte/components") ||
							id.includes("saas-svelte/typography") ||
							id.includes("saas-svelte/layout") ||
							id.includes("saas-svelte/utils")
						) {
							return "ui";
						}
					},
				},
			},
		},
	},
});
