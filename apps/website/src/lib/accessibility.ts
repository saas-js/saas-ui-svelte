/**
 * Utility for loading and accessing accessibility test results.
 */

import type { ComponentCategory } from "./stories";

export interface StoryAccessibility {
	storyId: string;
	component: string;
	story: string;
	category: string;
	status: "success" | "warning" | "error";
	violations: number;
	incomplete: number;
	passes: number;
}

export interface AccessibilityReport {
	generatedAt: string;
	stories: Record<string, StoryAccessibility>;
}

let cachedReport: AccessibilityReport | null = null;

/**
 * Load the accessibility report from the public folder.
 * Returns null if the report doesn't exist.
 */
export async function loadAccessibilityReport(): Promise<AccessibilityReport | null> {
	if (cachedReport) {
		return cachedReport;
	}

	try {
		// In Astro, we can import JSON files directly at build time
		const report = await import("../../public/a11y-report.json");
		cachedReport = report.default as AccessibilityReport;
		return cachedReport;
	} catch {
		// Report doesn't exist yet
		return null;
	}
}

/**
 * Convert a story name to the story ID format used in the report.
 * e.g., "Button", "WithIcon" -> "components-button--with-icon"
 */
export function getStoryId(
	category: ComponentCategory,
	componentName: string,
	storyName: string
): string {
	// Convert PascalCase to kebab-case
	const toKebab = (str: string) =>
		str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

	const categoryKebab = toKebab(category);
	const componentKebab = toKebab(componentName);
	const storyKebab = toKebab(storyName);

	return `${categoryKebab}-${componentKebab}--${storyKebab}`;
}

/**
 * Get the accessibility status for a specific story.
 */
export function getStoryAccessibility(
	report: AccessibilityReport | null,
	category: ComponentCategory,
	componentName: string,
	storyName: string
): StoryAccessibility | null {
	if (!report) {
		return null;
	}

	const storyId = getStoryId(category, componentName, storyName);
	return report.stories[storyId] || null;
}
