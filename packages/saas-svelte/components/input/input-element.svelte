<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * The position of the element within the input group.
	 * @default "left"
	 */
	placement?: "left" | "right";
	/**
	 * The content to be rendered inside the component.
	 */
	children?: Snippet;
}

let {
	children,
	class: className,
	placement = "left",
	...restProps
}: Props = $props();

const placementStyles = {
	left: "left-0 pl-3",
	right: "right-0 pr-3",
};
</script>

<div
	class={twMerge(
		"absolute",
		"top-0",
		"z-2",
		"flex",
		"h-full",
		"items-center",
		"justify-center",
		"text-fg-muted",
		"text-sm",
		"pointer-events-none",
		"antialiased",
		placementStyles[placement],
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
