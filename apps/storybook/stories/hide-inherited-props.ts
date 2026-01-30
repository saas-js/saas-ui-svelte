/**
 * Generates an exclude pattern regex for use in Storybook MDX ArgTypes.
 * Creates a negative lookahead regex that shows ONLY the specified props.
 *
 * @param allowedProps - Array of prop names that should be visible
 * @returns RegExp that excludes all props except those in allowedProps
 *
 * @example
 * // In your .mdx file:
 * import { generateExcludePattern } from "../../.storybook/hide-inherited-props";
 * const exclude = generateExcludePattern(['variant', 'size', 'color']);
 * <ArgTypes exclude={exclude} />
 */
export const generateExcludePattern = (allowedProps: string[]): RegExp => {
	const propsPattern = allowedProps.join("|");
	return new RegExp(`^(?!(${propsPattern})$).*$`);
};
