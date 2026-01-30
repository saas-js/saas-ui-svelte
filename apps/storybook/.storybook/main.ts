import type { StorybookConfig } from "@storybook/sveltekit";
import { mergeConfig } from "vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

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
		"@storybook/addon-vitest",
	],

	framework: {
		name: "@storybook/sveltekit",
		options: {},
	},

	viteFinal: async (config) => {
		const fixMdxShimPlugin = {
			name: "fix-mdx-shim",
			resolveId(source) {
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

		return mergeConfig(config, {
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
								if (id.includes("@storybook")) return "storybook-vendor";
								if (id.includes("svelte")) return "svelte-vendor";
								if (id.includes("@ark-ui") || id.includes("@zag-js"))
									return "ark-vendor";
								return "vendor";
							}
						},
					},
				},
			},
		});
	},

	features: {
		outline: false,
	},
};

export default config;
