import type { StorybookConfig } from "@storybook/sveltekit";
import { mergeConfig } from "vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
// Set via package.json build script - excludes ~3MB vitest mocking code from production
const isBuild = process.env.STORYBOOK_BUILD === "true";

const config: StorybookConfig = {
	stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)"],

	addons: [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-svelte-csf",
			options: {
				legacyTemplate: false,
			},
		},
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@vueless/storybook-dark-mode",
		// Only include vitest addon in dev - excludes ~3MB mocking entry from production
		...(isBuild ? [] : ["@storybook/addon-vitest"]),
	],

	framework: {
		name: "@storybook/sveltekit",
		options: {},
	},

	viteFinal: async (config) => {
		const fixMdxShimPlugin = {
			name: "fix-mdx-shim",
			resolveId(source: string) {
				if (
					source.startsWith("file://") &&
					source.includes("mdx-react-shim")
				) {
					return source
						.replace("file://./", "./")
						.replace("file://", "");
				}
			},
		};

		// Filter out vitest plugins in production builds to exclude ~3MB mocking entry
		const filteredPlugins = isBuild
			? (config.plugins ?? []).filter((plugin) => {
					const name =
						plugin && typeof plugin === "object" && "name" in plugin
							? plugin.name
							: "";
					return !name?.includes("vitest") && !name?.includes("mocker");
				})
			: config.plugins;

		return mergeConfig(
			{ ...config, plugins: filteredPlugins },
			{
				base: isGitHubPages ? "/storybook/" : undefined,
				plugins: [fixMdxShimPlugin],
				server: {
					fs: {
						allow: [".."],
					},
				},
				build: {
					rollupOptions: {
						output: {
							manualChunks: (id: string) => {
								if (id.includes("node_modules")) {
									// Check more specific patterns first to avoid circular dependencies
									if (id.includes("@ark-ui") || id.includes("@zag-js"))
										return "ark-vendor";
									// @storybook/sveltekit contains svelte - check svelte BEFORE storybook
									if (
										id.includes("svelte") &&
										!id.includes("@storybook")
									)
										return "svelte-vendor";
									if (id.includes("@storybook")) return "storybook-vendor";
									return "vendor";
								}
							},
						},
					},
				},
			}
		);
	},

	features: {
		outline: false,
	},
};

export default config;
