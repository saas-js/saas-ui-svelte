<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { TIMELINE_CTX, type TimelineContext } from "./timeline-root.svelte";
import { VStack } from "$saas/layout/stack";

interface Props {
	/**
	 * Content to render inside the content area.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	/**
	 * Flex value for alternating layouts.
	 */
	flex?: string | number;
	/**
	 * Alignment of items within the content.
	 */
	alignItems?: "flex-start" | "flex-end" | "center";
	/**
	 * Width of the content area.
	 */
	width?: "auto" | "full";
	[key: string]: any;
}

let {
	children,
	class: className,
	flex,
	alignItems,
	width,
	...restProps
}: Props = $props();

const ctx = getContext<TimelineContext>(TIMELINE_CTX);

const hasFlex = $derived(flex === 1 || flex === "1");
const baseClass = $derived(
	width === "auto"
		? "flex-col gap-2 flex"
		: hasFlex
			? "flex-col gap-2 flex pb-6"
			: (ctx?.styles.content() ?? "flex-col gap-2 w-full flex pb-6"),
);
const flexClass = $derived(hasFlex ? "flex-1" : "");
const alignClass = $derived(
	alignItems === "flex-end"
		? "items-end text-right"
		: alignItems === "center"
			? "items-center text-center"
			: "",
);
</script>

<VStack
	gap={2}
	class={twMerge(baseClass, flexClass, alignClass, className)}
	{...restProps}
>
	{@render children?.()}
</VStack>
