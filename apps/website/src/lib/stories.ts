/**
 * Utility functions for working with Storybook stories in the docs site.
 * Stories are imported from the storybook app and rendered using Svelte wrappers.
 */

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
	module: Record<string, unknown>
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
	const params = story as { parameters?: { docs?: { description?: { story?: string } } } };
	return params.parameters?.docs?.description?.story;
}

/**
 * Generates default anatomy code for a component.
 */
export function generateComponentAnatomy(componentTitle: string, componentSlug: string): string {
	const lines = [
		"<script>",
		`  import { ${componentTitle} } from "@saas-ui/svelte/components/${componentSlug}";`,
		"</script>",
		"",
		`<${componentTitle}>...</${componentTitle}>`
	];
	return lines.join("\n");
}

export function generateLayoutAnatomy(componentTitle: string, componentSlug: string): string {
	const lines = [
		"<script>",
		`  import { ${componentTitle} } from "@saas-ui/svelte/layout/${componentSlug}";`,
		"</script>",
		"",
		`<${componentTitle}>...</${componentTitle}>`
	];
	return lines.join("\n");
}

export function generateTypographyAnatomy(componentTitle: string, componentSlug: string): string {
	const lines = [
		"<script>",
		`  import { ${componentTitle} } from "@saas-ui/svelte/typography/${componentSlug}";`,
		"</script>",
		"",
		`<${componentTitle}>...</${componentTitle}>`
	];
	return lines.join("\n");
}

export function generateUtilitiesAnatomy(componentTitle: string, componentSlug: string): string {
	const lines = [
		"<script>",
		`  import { ${componentTitle} } from "@saas-ui/svelte/utilities/${componentSlug}";`,
		"</script>",
		"",
		`<${componentTitle}>...</${componentTitle}>`
	];
	return lines.join("\n");
}
