<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * Maximum width of the scroll area.
	 */
	maxW?: string;
	/**
	 * Height of the scroll area.
	 */
	height?: string;
	/**
	 * Border width for the scroll area.
	 */
	borderWidth?: string;
	/**
	 * Border radius for the scroll area.
	 */
	rounded?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Scroll area content.
	 */
	children?: Snippet;
}

let {
	maxW,
	height,
	borderWidth,
	rounded,
	class: className,
	children,
}: Props = $props();

const style = $derived(
	[
		maxW && `max-width: ${maxW}`,
		height && `height: ${height}`,
		borderWidth && `border-width: ${borderWidth}`,
	]
		.filter(Boolean)
		.join("; "),
);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class={twMerge(
		"focus-visible:ring-ring-focus block overflow-x-auto overflow-y-auto whitespace-nowrap focus:outline-none focus-visible:ring-2",
		borderWidth && "border-border-default border",
		rounded && `rounded-${rounded}`,
		className,
	)}
	style={style || undefined}
	tabindex="0"
	role="region"
	aria-label="Scrollable table"
>
	{@render children?.()}
</div>
