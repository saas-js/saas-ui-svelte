/**
 * Utility functions for working with Storybook stories in the docs site.
 * Stories are imported from the storybook app and rendered using Svelte wrappers.
 */

/**
 * Converts PascalCase or camelCase to kebab-case.
 * e.g., "WithIcon" -> "with-icon", "MultipleActions" -> "multiple-actions"
 */
export function toKebabCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export interface StoryMeta {
	title: string;
	component?: unknown;
	argTypes?: Record<string, ArgType>;
	args?: Record<string, unknown>;
	parameters?: Record<string, unknown>;
}

export interface ArgType {
	control?: string | { type: string };
	options?: readonly string[];
	description?: string;
	table?: {
		defaultValue?: { summary: string };
		type?: { summary: string };
	};
}

export interface Story {
	name?: string;
	args?: Record<string, unknown>;
	render?: () => unknown;
}

/**
 * Extracts the component name from a story title.
 * e.g., "components/Button" -> "Button"
 */
export function getComponentName(title: string): string {
	const parts = title.split("/");
	return parts[parts.length - 1];
}

/**
 * Extracts the category from a story title.
 * e.g., "components/Button" -> "components"
 */
export function getCategory(title: string): string {
	const parts = title.split("/");
	return parts[0];
}

/**
 * Converts a story export name to a display name.
 * e.g., "WithIcon" -> "With Icon"
 */
export function storyNameToDisplayName(name: string): string {
	return name.replace(/([A-Z])/g, " $1").trim();
}

/**
 * Gets all exported stories from a story module (excludes default export).
 */
export function getStories(
	module: Record<string, unknown>,
): Record<string, Story> {
	const stories: Record<string, Story> = {};
	for (const [key, value] of Object.entries(module)) {
		if (key !== "default" && typeof value === "object" && value !== null) {
			stories[key] = value as Story;
		}
	}
	return stories;
}

/**
 * Gets JSDoc description from a story if available.
 */
export function getStoryDescription(story: Story): string | undefined {
	// CSF3 stories can have descriptions in parameters
	const params = story as {
		parameters?: { docs?: { description?: { story?: string } } };
	};
	return params.parameters?.docs?.description?.story;
}

/**
 * Generates default anatomy code for a component.
 */
export type ComponentCategory =
	| "components"
	| "layout"
	| "typography"
	| "utilities";

export function generateAnatomy(
	componentTitle: string,
	componentSlug: string,
	category: ComponentCategory = "components",
): string {
	const lines = [
		"<script>",
		`  import { ${componentTitle} } from "@saas-ui/svelte/${category}/${componentSlug}";`,
		"</script>",
		"",
		`<${componentTitle}>...</${componentTitle}>`,
	];
	return lines.join("\n");
}

// Backwards-compatible aliases
export const generateComponentAnatomy = (title: string, slug: string) =>
	generateAnatomy(title, slug, "components");
export const generateLayoutAnatomy = (title: string, slug: string) =>
	generateAnatomy(title, slug, "layout");
export const generateTypographyAnatomy = (title: string, slug: string) =>
	generateAnatomy(title, slug, "typography");
export const generateUtilitiesAnatomy = (title: string, slug: string) =>
	generateAnatomy(title, slug, "utilities");

/**
 * Converts a story name to lowerCamelCase for wrapper props.
 * e.g., "WithIcon" -> "withIcon", "MultipleActions" -> "multipleActions"
 */
export function getStoryPropValue(storyName: string): string {
	return storyName.charAt(0).toLowerCase() + storyName.slice(1);
}

/**
 * Builds table of contents items for a doc page.
 */
export interface TocItem {
	label: string;
	href: string;
	level: number;
	children?: TocItem[];
}

export interface SubComponent {
	name: string;
	description?: string;
	props?: Record<string, unknown>;
}

export function buildTocItems(
	stories: Record<string, Story>,
	meta: StoryMeta & { parameters?: { subComponents?: SubComponent[] } },
	hasProps: boolean,
): TocItem[] {
	const subComponents = meta?.parameters?.subComponents || [];

	return [
		{ label: "Anatomy", href: "#anatomy", level: 1 },
		{
			label: "Examples",
			href: "#examples",
			level: 1,
			children: Object.keys(stories).map((name) => ({
				label: storyNameToDisplayName(name),
				href: `#${toKebabCase(name)}`,
				level: 2,
			})),
		},
		...(hasProps
			? [
					{
						label: "Props",
						href: "#props",
						level: 1,
						children:
							subComponents.length > 0
								? subComponents.map((sc: SubComponent) => ({
										label: sc.name,
										href: `#props-${sc.name.toLowerCase().replace(/\./g, "-")}`,
										level: 2,
									}))
								: [],
					},
				]
			: []),
	];
}

/**
 * Creates static paths from story modules for Astro's getStaticPaths.
 */
export function createStaticPathsFromModules(
	modules: Record<string, unknown>,
): Array<{
	params: { slug: string };
	props: {
		componentName: string;
		meta: unknown;
		stories: Record<string, Story>;
	};
}> {
	return Object.entries(modules).map(([path, module]) => {
		const match = path.match(/\/([^/]+)\.stories\.ts$/);
		const componentName = match ? match[1] : "";
		const slug = toKebabCase(componentName);

		return {
			params: { slug },
			props: {
				componentName,
				meta: (module as Record<string, unknown>).default,
				stories: getStories(module as Record<string, unknown>),
			},
		};
	});
}

/**
 * Extracts code for a specific story from a wrapper component source.
 * Parses the wrapper file to find the {#if story === "storyName"} block.
 */
export function extractStoryCode(
	wrapperSource: string,
	storyName: string,
): string {
	// Normalize the story name to match the wrapper format (lowerCamelCase)
	const normalizedStoryName =
		storyName.charAt(0).toLowerCase() + storyName.slice(1);

	// Try to find the exact {#if story === "storyName"} or {:else if story === "storyName"} block
	const patterns = [
		new RegExp(
			`\\{#if\\s+story\\s*===\\s*["']${normalizedStoryName}["']\\}([\\s\\S]*?)(?:\\{:else|\\{/if\\})`,
			"i",
		),
		new RegExp(
			`\\{:else\\s+if\\s+story\\s*===\\s*["']${normalizedStoryName}["']\\}([\\s\\S]*?)(?:\\{:else|\\{/if\\})`,
			"i",
		),
	];

	for (const pattern of patterns) {
		const match = wrapperSource.match(pattern);
		if (match && match[1]) {
			// Split into lines first, before any trimming
			const rawLines = match[1].split("\n");

			// Remove empty lines from start and end
			while (rawLines.length > 0 && rawLines[0].trim() === "") {
				rawLines.shift();
			}
			while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === "") {
				rawLines.pop();
			}

			if (rawLines.length === 0) {
				return "";
			}

			// Calculate minimum indentation across all non-empty lines
			const minIndent = rawLines
				.filter((line) => line.trim().length > 0)
				.reduce((min, line) => {
					const indent = line.match(/^(\t*)/)?.[1].length || 0;
					return Math.min(min, indent);
				}, Infinity);

			// Remove the common indentation from all lines
			if (minIndent > 0 && minIndent !== Infinity) {
				return rawLines.map((line) => line.slice(minIndent)).join("\n");
			}
			return rawLines.join("\n");
		}
	}

	return "";
}
